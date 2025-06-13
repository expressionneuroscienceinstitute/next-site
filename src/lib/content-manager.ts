import fs from 'fs/promises';
import path from 'path';

export interface ConfigFile {
  id: string;
  name: string;
  path: string;
  description: string;
}

export const configFiles: ConfigFile[] = [
  {
    id: 'about',
    name: 'About Page',
    path: 'src/app/data/aboutConfig.ts',
    description: 'Mission, board members, and future vision content'
  },
  {
    id: 'roadmap',
    name: 'Roadmap',
    path: 'src/app/data/roadmapConfig.ts',
    description: 'Research timeline and program roadmap'
  },
  {
    id: 'donate',
    name: 'Donate Page',
    path: 'src/app/data/donateConfig.ts',
    description: 'Donation page content and messaging'
  },
  {
    id: 'research',
    name: 'Research Page',
    path: 'src/app/data/researchConfig.ts',
    description: 'Research datasets and publications'
  },
  {
    id: 'documents',
    name: 'Document Links',
    path: 'src/app/data/documentConfig.ts',
    description: 'Footer document links and navigation'
  }
];

export async function readConfigFile(filePath: string): Promise<string> {
  try {
    const absolutePath = path.join(process.cwd(), filePath);
    const content = await fs.readFile(absolutePath, 'utf-8');
    return content;
  } catch (error) {
    throw new Error(`Failed to read config file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export async function writeConfigFile(filePath: string, content: string): Promise<void> {
  try {
    // Validate that the content is valid TypeScript/JavaScript
    if (!content.includes('export')) {
      throw new Error('Content must include at least one export statement');
    }

    // Basic syntax validation
    if (!isValidTypeScript(content)) {
      throw new Error('Invalid TypeScript syntax detected');
    }

    const absolutePath = path.join(process.cwd(), filePath);
    
    // Create backup
    const backupPath = `${absolutePath}.backup.${Date.now()}`;
    try {
      const existingContent = await fs.readFile(absolutePath, 'utf-8');
      await fs.writeFile(backupPath, existingContent);
    } catch (error) {
      // File might not exist, that's okay
    }

    // Write new content
    await fs.writeFile(absolutePath, content, 'utf-8');
  } catch (error) {
    throw new Error(`Failed to write config file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

function isValidTypeScript(content: string): boolean {
  // Basic validation - check for balanced braces, quotes, etc.
  const openBraces = (content.match(/\{/g) || []).length;
  const closeBraces = (content.match(/\}/g) || []).length;
  
  if (openBraces !== closeBraces) {
    return false;
  }

  // Check for basic export structure
  if (!/export\s+(const|function|class|interface|type)/.test(content)) {
    return false;
  }

  return true;
}

export async function backupAllConfigs(): Promise<string> {
  const timestamp = Date.now();
  const backupDir = path.join(process.cwd(), 'backups', timestamp.toString());
  
  try {
    await fs.mkdir(backupDir, { recursive: true });
    
    for (const config of configFiles) {
      try {
        const content = await readConfigFile(config.path);
        const backupPath = path.join(backupDir, path.basename(config.path));
        await fs.writeFile(backupPath, content);
      } catch (error) {
        console.warn(`Failed to backup ${config.path}:`, error);
      }
    }
    
    return backupDir;
  } catch (error) {
    throw new Error(`Failed to create backup: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

export function getConfigById(id: string): ConfigFile | undefined {
  return configFiles.find(config => config.id === id);
}