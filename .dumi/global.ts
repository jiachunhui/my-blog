import Prism from 'prism-react-renderer/prism';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-kotlin');
require('prismjs/components/prism-csharp');
require('prismjs/components/prism-cshtml');
require('prismjs/components/prism-css');
require('prismjs/components/prism-nginx');
require('prismjs/components/prism-vim');

