var templateReg = /(<\/?)template([\s\S]*?>)/ig;
var vueBeautifyDivReg = /(<\/?)vueBeautifyDiv([\s\S]*?>)/ig;
var previousComponent = {
  manager: '',
  preview: ''
};
var target = null;

function beautifyVue(text) {
  if (!text) {
    return;
  }

  text = text.replace(templateReg, function(match, begin, end) {
    return begin + 'vueBeautifyDiv' + end;
  });

  text = html_beautify(text, {
    indent_size: 2,
    indent_char: ' ',
    brace_style: 'collapse'
  });

  return text.replace(vueBeautifyDivReg, function(match, begin, end) {
    return begin + 'template' + end;
  });
}

// This sometimes fails on the first try
function highlightCode(samples) {
  for (var i = 0; i < samples.length; i++) {
    var classlist = samples[i].classList.toString();
    var markup = samples[i].textContent;

    if (markup !== '' && classlist.indexOf('highlighted') === -1 && classlist.indexOf('glamorous') === -1 && classlist.indexOf('css-') === -1) {
      if (markup.charAt(0) === '<') {
        markup = beautifyVue(markup);
      } else {
        markup = markup.replace('export default', "\n\nexport default");
        markup = js_beautify(markup, {
          indent_size: 2,
          indent_char: ' ',
          brace_style: 'collapse'
        });
      }

      var output = hljs.highlightAuto(markup).value;

      samples[i].innerHTML = output;
      samples[i].classList.add('highlighted');
      samples[i].style.opacity = 1;

      if (document.querySelector('#toggle-code')) {
        document.querySelector('.vue-info .code').classList.remove('open');
        document.querySelector('.vue-info .props').classList.remove('open');
        document.querySelector('#toggle-code').classList.remove('active');
        document.querySelector('#toggle-props').classList.remove('active');
        document.querySelector('#reload-preview').classList.remove('active');
        document.querySelector('#toggle-code').style.display = 'block';
        document.querySelector('#toggle-props').style.display = 'block';
        document.querySelector('#reload-preview').style.display = 'block';
      }
    }
  }
}

function externallinks() {
	if (!document.getElementsByTagName) return;
	var anchors = document.getElementsByTagName('a');
	for (var i=0; i<anchors.length; i++) {
		var anchor = anchors[i];
		if (anchor.getAttribute('href')) {
      if(anchor.getAttribute('href').substring(0, 4) === 'http' && anchor.target !== '_blank') {
        anchor.target = '_blank';
      }
		}
	}
}

function getJsonFromUrl() {
  var query = location.search.substr(1);
  var result = {};

  query.split("&").forEach(function(part) {
    var item = part.split("=");
    result[item[0]] = decodeURIComponent(item[1]);
  });

  return result;
}

function updatePageTitle () {
  var params = getJsonFromUrl();
  document.title = (params.selectedKind && params.selectedStory) ? `UI Toolkit - ${params.selectedKind} - ${params.selectedStory}` : 'StayWoke - UI Toolkit';
}

function checkUpdate (win) {
  target = win;

  var sample;
  var $code = document.querySelector('#toggle-code');
  var $props = document.querySelector('#toggle-props');
  var $reload = document.querySelector('#reload-preview');

  if (target === 'manager') {
    samples = document.querySelectorAll('.Pane.horizontal.Pane2 pre');
  } else if (target === 'preview') {
    samples = document.querySelectorAll('.vue-info pre');
  }

  var currentComponent = (typeof window.parent.location !== 'undefined') ? window.parent.location.search : window.location.search;
  if (samples.length > 0 && currentComponent !== previousComponent[target]) {
    previousComponent[target] = currentComponent;

    updatePageTitle();
    externallinks();
    updatePageTitle();
    highlightCode(samples);

    setInterval(function() { highlightCode(samples); }, 100);
  } else if (samples.length === 0 && currentComponent !== previousComponent[target]) {
    if ($code && $props && $reload) {
      $code.style.display = 'none';
      $props.style.display = 'none';
      $reload.style.display = 'none';
    }
  }
}
