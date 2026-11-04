const fs=require('node:fs'),path=require('node:path'),MarkdownIt=require('markdown-it');
const markdown=new MarkdownIt({html:false,linkify:false,typographer:false});
markdown.core.ruler.after('inline','approved-heading-ids',state=>{for(let i=0;i<state.tokens.length-1;i++){const heading=state.tokens[i],inline=state.tokens[i+1];if(heading.type!=='heading_open'||inline.type!=='inline')continue;const match=inline.content.match(/\s+\{#([A-Za-z][\w-]*)\}$/);if(!match)continue;heading.attrSet('id',match[1]);inline.content=inline.content.slice(0,match.index);const last=inline.children?.at(-1);if(last?.type==='text')last.content=last.content.replace(/\s+\{#[A-Za-z][\w-]*\}$/,'')}});
function load(name){const file=path.resolve(__dirname,'../../content/approved-en/locked-'+name+'.md');const body=fs.readFileSync(file,'utf8').replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/,'');const tokens=markdown.parse(body,{}),index=tokens.findIndex(t=>t.type==='heading_open'&&t.tag==='h1');return{title:tokens[index+1].content,html:markdown.renderer.render(tokens,markdown.options,{}).replace(/<p>\s*<a href="https:\/\/wa\.me\/972533366276[^"]*">WhatsApp<\/a>\s*·\s*<a href="https:\/\/signal\.me\/#p\/\+972533366276">Signal<\/a>\s*<\/p>\n?/g,'')}}
const copy={en:{
  "title": "Toza — Private digital protection",
  "description": "Private digital protection for private clients.",
  "skip": "Skip to content",
  "navLabel": "Main navigation",
  "home": "Toza home",
  "nav": [
    {
      "href": "#situations",
      "label": "Situations"
    },
    {
      "href": "/en/how-it-works/",
      "label": "How it works"
    },
    {
      "href": "/en/pricing/",
      "label": "Pricing"
    },
    {
      "href": "/en/faq/",
      "label": "FAQ"
    }
  ],
  "heroAlt": "A woman considers information on her phone while seated at a table.",
  "hero": "Are you sure your private information is still private?",
  "explanation": "Private conversations, financial information and unshared plans can become leverage over your money, reputation and decisions. Exposure includes what someone can reach, copies already held elsewhere and what separate details reveal together.",
  "service": "In person · With you present · One senior expert, start to finish",
  "invitation": "Request a private conversation",
  "situationsTitle": "Situations",
  "situations": [
    {
      "title": "Separation",
      "photo": "sit-1-900.jpg"
    },
    {
      "title": "Business dispute",
      "photo": "sit-2-900.jpg"
    },
    {
      "title": "Inheritance conflict",
      "photo": "sit-3-900.jpg"
    }
  ],
  "footer": "Toza · Local design preview",
  "descriptor": "Tailored digital protection for private clients"
}};
copy.en.ui=JSON.parse(fs.readFileSync(path.join(__dirname,'i18n/en.json'),'utf8')).ui;
module.exports={copy,locales:{en:{code:'en',lang:'en',dir:'ltr'}},contact:JSON.parse(fs.readFileSync(path.join(__dirname,'contact.json'),'utf8')),lockedPages:Object.fromEntries(['home','exposure','approach','expert'].map(name=>[name,load(name)]))};
