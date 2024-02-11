import path from 'path';
import fs from 'fs-extra';

let assetsData: any = null;

const loadAssets = async () => {
  if (assetsData) {
    return assetsData;
  }

  assetsData = { found: false, css: [], js: [] };
  const manifestPath = path.resolve('./public/build/manifest.json');
  
  try {
    await fs.access(manifestPath);
    const manifestText = await fs.readFile(manifestPath, 'utf-8');
    const manifest = JSON.parse(manifestText);
    console.log(manifest);
    assetsData.found = true;
    const pageImports = manifest['index.html'];

    if(pageImports) {
        pageImports.css?.forEach((css: string) => assetsData.css.push(`/build/${css}`));
        pageImports.imports?.forEach((imp: string) => assetsData.js.push(`/build/${manifest[imp].file}`));
        assetsData.js?.push(`/build/${pageImports.file}`);
    }
  } catch (e) {
    if (!e.errno || e.errno !== -4058) {
      console.error(e);
    }
  }
  return assetsData;
};

export default loadAssets;