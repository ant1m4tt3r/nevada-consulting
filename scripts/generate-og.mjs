import { readFileSync } from 'node:fs';
import sharp from 'sharp';

const brandAssets = {
  typescript: readFileSync('public/brands/typescript.svg').toString('base64'),
  python: readFileSync('public/brands/python.svg').toString('base64'),
  go: readFileSync('public/brands/go.svg').toString('base64'),
};

const brandImage = (name, { x, y, width, height }) =>
  `<image x="${x}" y="${y}" width="${width}" height="${height}" preserveAspectRatio="xMidYMid meet" href="data:image/svg+xml;base64,${brandAssets[name]}"/>`;

const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F8F6F2"/>
  <rect x="0" y="0" width="12" height="630" fill="#8D519E"/>

  <text x="70" y="78" fill="#62306D" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="5">NEVADA CONSULTING</text>
  <line x1="70" y1="104" x2="420" y2="104" stroke="#D8C8DD" stroke-width="2"/>

  <text x="70" y="215" fill="#17131B" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="700" letter-spacing="-2">
    <tspan x="70" dy="0">Talento técnico que</tspan>
    <tspan x="70" dy="68">transforma código em</tspan>
    <tspan x="70" dy="68" fill="#62306D">valor de negócio.</tspan>
  </text>

  <text x="70" y="480" fill="#6B616E" font-family="Arial, Helvetica, sans-serif" font-size="20">
    Tech Recruiting global · Talent Strategy
  </text>
  <text x="70" y="520" fill="#8B818F" font-family="Arial, Helvetica, sans-serif" font-size="16">
    Pessoas certas. Negócios que avançam.
  </text>

  <rect x="676" y="52" width="456" height="526" rx="24" fill="#17131B"/>
  <text x="714" y="102" fill="#C9A0D2" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="2">ENGENHARIA → IMPACTO</text>

  <rect x="714" y="132" width="180" height="94" rx="14" fill="#222025" stroke="#3A343E"/>
  ${brandImage('typescript', { x: 738, y: 155, width: 46, height: 46 })}
  <text x="800" y="174" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">TypeScript</text>
  <text x="800" y="198" fill="#A69AAA" font-family="Arial, Helvetica, sans-serif" font-size="11">Produto</text>

  <rect x="714" y="242" width="180" height="94" rx="14" fill="#222025" stroke="#3A343E"/>
  ${brandImage('python', { x: 742, y: 260, width: 38, height: 47 })}
  <text x="800" y="284" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">Python</text>
  <text x="800" y="308" fill="#A69AAA" font-family="Arial, Helvetica, sans-serif" font-size="11">Dados</text>

  <rect x="714" y="352" width="180" height="94" rx="14" fill="#222025" stroke="#3A343E"/>
  ${brandImage('go', { x: 728, y: 383, width: 64, height: 24 })}
  <text x="800" y="394" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">Go</text>
  <text x="800" y="418" fill="#A69AAA" font-family="Arial, Helvetica, sans-serif" font-size="11">Escala</text>

  <path d="M898 179H906M902 175L906 179L902 183" fill="none" stroke="#B8F3D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M898 289H906M902 285L906 289L902 293" fill="none" stroke="#B8F3D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M898 399H906M902 395L906 399L902 403" fill="none" stroke="#B8F3D2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>

  <rect x="910" y="132" width="184" height="94" rx="14" fill="#1D1920" stroke="#3A343E"/>
  <text x="928" y="158" fill="#A69AAA" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" letter-spacing="1.4">VALOR CRIADO</text>
  <line x1="928" y1="208" x2="1076" y2="208" stroke="#4B424F" stroke-width="1"/>
  <rect x="934" y="190" width="18" height="18" rx="3" fill="#8D519E" opacity=".55"/>
  <rect x="960" y="182" width="18" height="26" rx="3" fill="#8D519E" opacity=".7"/>
  <rect x="986" y="172" width="18" height="36" rx="3" fill="#8D519E" opacity=".85"/>
  <rect x="1012" y="160" width="18" height="48" rx="3" fill="#8D519E"/>
  <rect x="1038" y="147" width="18" height="61" rx="3" fill="#B8F3D2"/>

  <rect x="910" y="242" width="184" height="94" rx="14" fill="#1D1920" stroke="#3A343E"/>
  <text x="928" y="267" fill="#8D519E" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" letter-spacing="1.4">01 · DECISÃO</text>
  <text x="928" y="296" fill="#B8F3D2" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">DECIDIR</text>
  <text x="928" y="316" fill="#A69AAA" font-family="Arial, Helvetica, sans-serif" font-size="10" letter-spacing=".8">COM MAIS CLAREZA</text>

  <rect x="910" y="352" width="184" height="94" rx="14" fill="#1D1920" stroke="#3A343E"/>
  <text x="928" y="377" fill="#00ADD8" font-family="Arial, Helvetica, sans-serif" font-size="10" font-weight="700" letter-spacing="1.4">02 · CRESCIMENTO</text>
  <text x="928" y="406" fill="#B8F3D2" font-family="Arial, Helvetica, sans-serif" font-size="24" font-weight="700">CRESCER</text>
  <text x="928" y="426" fill="#A69AAA" font-family="Arial, Helvetica, sans-serif" font-size="10" letter-spacing=".8">COM MAIS CAPACIDADE</text>

  <line x1="714" y1="486" x2="1094" y2="486" stroke="#3A343E"/>
  <text x="714" y="528" fill="#DED8E1" font-family="Arial, Helvetica, sans-serif" font-size="15">Código é meio.</text>
  <text x="828" y="528" fill="#B8F3D2" font-family="Arial, Helvetica, sans-serif" font-size="15" font-weight="700">Impacto é o resultado.</text>
</svg>`;

const englishSvg = svg
  .replace('font-size="58"', 'font-size="54"')
  .replace('Talento técnico que', 'Technical talent that')
  .replace('transforma código em', 'turns code into')
  .replace('valor de negócio.', 'business value.')
  .replace(
    'Tech Recruiting global · Talent Strategy',
    'Global Tech Recruiting · Talent Strategy',
  )
  .replace(
    'Pessoas certas. Negócios que avançam.',
    'The right people. Businesses moving forward.',
  )
  .replace('ENGENHARIA → IMPACTO', 'ENGINEERING → IMPACT')
  .replace('Produto', 'Product')
  .replace('Dados', 'Data')
  .replace('Escala', 'Scale')
  .replace('VALOR CRIADO', 'VALUE CREATED')
  .replace('01 · DECISÃO', '01 · DECISION')
  .replace('DECIDIR', 'DECIDE')
  .replace('COM MAIS CLAREZA', 'WITH GREATER CLARITY')
  .replace('02 · CRESCIMENTO', '02 · GROWTH')
  .replace('CRESCER', 'GROW')
  .replace('COM MAIS CAPACIDADE', 'WITH GREATER CAPACITY')
  .replace('Código é meio.', 'Code is the means.')
  .replace('x="828" y="528"', 'x="858" y="528"')
  .replace('Impacto é o resultado.', 'Impact is the outcome.');

const broadSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F8F6F2"/>
  <rect x="0" y="0" width="12" height="630" fill="#8D519E"/>
  <circle cx="1080" cy="70" r="240" fill="#E8D8EC" opacity=".55"/>

  <text x="70" y="78" fill="#62306D" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="5">NEVADA CONSULTING</text>
  <line x1="70" y1="104" x2="420" y2="104" stroke="#D8C8DD" stroke-width="2"/>

  <text x="70" y="205" fill="#17131B" font-family="Arial, Helvetica, sans-serif" font-size="55" font-weight="700" letter-spacing="-2">
    <tspan x="70" dy="0">Estratégia de</tspan>
    <tspan x="70" dy="66">recrutamento para</tspan>
    <tspan x="70" dy="66" fill="#62306D">decisões críticas.</tspan>
  </text>

  <text x="70" y="455" fill="#6B616E" font-family="Arial, Helvetica, sans-serif" font-size="20">
    Recrutamento sênior · Tecnologia no centro
  </text>
  <text x="70" y="500" fill="#8B818F" font-family="Arial, Helvetica, sans-serif" font-size="16">
    Processo conduzido pessoalmente por Juliana Carvalho.
  </text>

  <rect x="724" y="118" width="408" height="394" rx="28" fill="#17131B"/>
  <text x="764" y="170" fill="#C9A0D2" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="2">COMPROMISSOS COMERCIAIS</text>

  <rect x="764" y="202" width="328" height="76" rx="16" fill="#222025" stroke="#3A343E"/>
  <circle cx="800" cy="240" r="14" fill="#B8F3D2"/>
  <path d="M794 240l4 4 8-9" fill="none" stroke="#17131B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="830" y="247" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">Success fee</text>

  <rect x="764" y="294" width="328" height="76" rx="16" fill="#222025" stroke="#3A343E"/>
  <circle cx="800" cy="332" r="14" fill="#B8F3D2"/>
  <path d="M794 332l4 4 8-9" fill="none" stroke="#17131B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="830" y="339" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">SLA de 5 dias</text>

  <rect x="764" y="386" width="328" height="76" rx="16" fill="#222025" stroke="#3A343E"/>
  <circle cx="800" cy="424" r="14" fill="#B8F3D2"/>
  <path d="M794 424l4 4 8-9" fill="none" stroke="#17131B" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
  <text x="830" y="431" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">Garantia de 3 meses</text>
</svg>`;

const broadEnglishSvg = broadSvg
  .replace('Estratégia de', 'Recruitment')
  .replace('recrutamento para', 'strategy for critical')
  .replace('decisões críticas.', 'decisions.')
  .replace(
    'Recrutamento sênior · Tecnologia no centro',
    'Senior recruitment · Technology at the core',
  )
  .replace(
    'Processo conduzido pessoalmente por Juliana Carvalho.',
    'Every search personally led by Juliana Carvalho.',
  )
  .replace('COMPROMISSOS COMERCIAIS', 'COMMERCIAL COMMITMENTS')
  .replace('SLA de 5 dias', '5-day SLA')
  .replace('Garantia de 3 meses', '3-month guarantee');

const candidateSvg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F8F6F2"/>
  <rect x="0" y="0" width="12" height="630" fill="#8D519E"/>
  <circle cx="1080" cy="70" r="240" fill="#E8D8EC" opacity=".55"/>

  <text x="70" y="78" fill="#62306D" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="5">NEVADA CONSULTING</text>
  <line x1="70" y1="104" x2="420" y2="104" stroke="#D8C8DD" stroke-width="2"/>

  <text x="70" y="205" fill="#17131B" font-family="Arial, Helvetica, sans-serif" font-size="55" font-weight="700" letter-spacing="-2">
    <tspan x="70" dy="0">Consultoria para</tspan>
    <tspan x="70" dy="66" fill="#62306D">candidatos.</tspan>
  </text>

  <text x="70" y="402" fill="#6B616E" font-family="Arial, Helvetica, sans-serif" font-size="20">
    Comunique melhor o seu valor profissional.
  </text>
  <text x="70" y="450" fill="#8B818F" font-family="Arial, Helvetica, sans-serif" font-size="16">
    Orientação prática de uma recrutadora global.
  </text>

  <rect x="724" y="118" width="408" height="394" rx="28" fill="#17131B"/>
  <text x="764" y="170" fill="#C9A0D2" font-family="Arial, Helvetica, sans-serif" font-size="13" font-weight="700" letter-spacing="2">POSICIONAMENTO DE CARREIRA</text>

  <rect x="764" y="210" width="328" height="104" rx="16" fill="#222025" stroke="#3A343E"/>
  <text x="792" y="250" fill="#B8F3D2" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">01</text>
  <text x="792" y="282" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">Currículo &amp; LinkedIn</text>

  <rect x="764" y="334" width="328" height="104" rx="16" fill="#222025" stroke="#3A343E"/>
  <text x="792" y="374" fill="#B8F3D2" font-family="Arial, Helvetica, sans-serif" font-size="12" font-weight="700" letter-spacing="1.5">02</text>
  <text x="792" y="406" fill="#FFFFFF" font-family="Arial, Helvetica, sans-serif" font-size="22" font-weight="700">Preparação para entrevistas</text>
</svg>`;

const candidateEnglishSvg = candidateSvg
  .replace('Consultoria para', 'Career consulting')
  .replace('candidatos.', 'for candidates.')
  .replace(
    'Comunique melhor o seu valor profissional.',
    'Communicate your professional value.',
  )
  .replace(
    'Orientação prática de uma recrutadora global.',
    'Practical guidance from a global recruiter.',
  )
  .replace('POSICIONAMENTO DE CARREIRA', 'CAREER POSITIONING')
  .replace('Currículo &amp; LinkedIn', 'Resume &amp; LinkedIn')
  .replace('Preparação para entrevistas', 'Interview preparation');

await Promise.all([
  sharp(Buffer.from(broadSvg)).png().toFile('public/og.png'),
  sharp(Buffer.from(broadEnglishSvg)).png().toFile('public/og-en.png'),
  sharp(Buffer.from(svg)).png().toFile('public/og-tech.png'),
  sharp(Buffer.from(englishSvg)).png().toFile('public/og-tech-en.png'),
  sharp(Buffer.from(candidateSvg)).png().toFile('public/og-candidates.png'),
  sharp(Buffer.from(candidateEnglishSvg))
    .png()
    .toFile('public/og-candidates-en.png'),
]);

console.log(
  'Generated localized social cards from deterministic SVG components.',
);
