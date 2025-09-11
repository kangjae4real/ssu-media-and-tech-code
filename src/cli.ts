#!/usr/bin/env node

import { existsSync, mkdirSync, cpSync } from 'fs';
import { dirname, resolve, join } from 'path';
import { fileURLToPath } from 'url';
import prompts, { type Answers } from 'prompts';

const main = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const templateDir = resolve(__dirname, '../template');

  const response: Answers<'projectName'> = await prompts({
    type: 'text',
    name: 'projectName',
    message: '프로젝트 이름을 입력하세요: ',
    initial: 'report',
  });

  if (!response?.projectName) {
    console.log('프로젝트 생성이 취소되었습니다.');
    return;
  }

  const userProjectName = response.projectName.trim();
  const targetDir = join(process.cwd(), userProjectName);

  if (existsSync(targetDir)) {
    console.error(`오류: '${userProjectName}' 폴더가 이미 존재합니다. 다른 이름을 선택해주세요.`);
    return;
  }

  mkdirSync(targetDir, { recursive: true });

  console.log(`'${userProjectName}' 프로젝트를 생성합니다...`);

  cpSync(templateDir, targetDir, { recursive: true });

  console.log('프로젝트 생성이 완료되었습니다!');
  console.log('아래 명령어를 실행하여 프로젝트를 시작하세요:');
  console.log(`cd ${userProjectName}`);
  console.log('bun install');
  console.log('bun run dev');
};

main().catch((err) => {
  console.error('오류가 발생했습니다:', err);
});
