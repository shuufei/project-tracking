export const userId_HirokazuMotegi = 'user0001';
export const idpUserId_HirokazuMotegi = 'idpuser0001';
export const user_HirokazuMotegi = {
  PK: `User-${userId_HirokazuMotegi}`,
  SK: `User-${userId_HirokazuMotegi}`,
  'User-name': '茂木 洋和',
  'User-idpUserId': idpUserId_HirokazuMotegi,
  type: 'user',
};

export const userId_KentaToshima = 'user0002';
export const idpUserId_KentaToshima = 'idpuser0002';
export const user_KentaToshima = {
  PK: `User-${userId_KentaToshima}`,
  SK: `User-${userId_KentaToshima}`,
  'User-name': '戸嶋 健太',
  'User-idpUserId': idpUserId_KentaToshima,
  type: 'user',
};

export const userId_RyoutaYamaura = 'user0003';
export const idpUserId_RyoutaYamaura = 'idpuser0003';
export const user_RyoutaYamaura = {
  PK: `User-${userId_RyoutaYamaura}`,
  SK: `User-${userId_RyoutaYamaura}`,
  'User-name': '山浦 諒太',
  'User-idpUserId': idpUserId_RyoutaYamaura,
  type: 'user',
};

export const userId_KeitaSakai = 'user0004';
export const idpUserId_KeitaSakai = 'idpuser0004';
export const user_KeitaSakai = {
  PK: `User-${userId_KeitaSakai}`,
  SK: `User-${userId_KeitaSakai}`,
  'User-name': '酒井 渓太',
  'User-idpUserId': idpUserId_KeitaSakai,
  type: 'user',
};

export const userId_NaokiOota = 'user0005';
export const idpUserId_NaokiOota = 'idpuser0005';
export const user_NaokiOota = {
  PK: `User-${userId_NaokiOota}`,
  SK: `User-${userId_NaokiOota}`,
  'User-name': '太田 尚樹',
  'User-idpUserId': idpUserId_NaokiOota,
  type: 'user',
};

export const userId_ShuuheiHanashiro = 'user0006';
export const idpUserId_ShuuheiHanashiro = 'idpuser0006';
export const user_ShuuheiHanashiro = {
  PK: `User-${userId_ShuuheiHanashiro}`,
  SK: `User-${userId_ShuuheiHanashiro}`,
  'User-name': '花城 周平',
  'User-idpUserId': idpUserId_ShuuheiHanashiro,
  type: 'user',
};

export const projectId_Bison = 'project0001';
export const project_Bison = {
  PK: `Project-${projectId_Bison}`,
  SK: `Project-${projectId_Bison}`,
  'Project-name': 'Bison',
  'Project-description':
    'プロジェクト管理アプリケーションの開発。¥nタスクトラッキング機能をプロジェクト管理のなかに組み込み、作業効率化につなげる。',
  'Project-color': 'Green',
  'Project-adminUserId': userId_ShuuheiHanashiro,
  type: 'project',
};

export const projectUserMapping_Bison = [
  {
    ...project_Bison,
    ...user_HirokazuMotegi,
    PK: project_Bison.PK,
    SK: user_HirokazuMotegi.PK,
    type: 'project-user',
  },
  {
    ...project_Bison,
    ...user_KentaToshima,
    PK: project_Bison.PK,
    SK: user_KentaToshima.PK,
    type: 'project-user',
  },
  {
    ...project_Bison,
    ...user_RyoutaYamaura,
    PK: project_Bison.PK,
    SK: user_RyoutaYamaura.PK,
    type: 'project-user',
  },
  {
    ...project_Bison,
    ...user_KeitaSakai,
    PK: project_Bison.PK,
    SK: user_KeitaSakai.PK,
    type: 'project-user',
  },
  {
    ...project_Bison,
    ...user_NaokiOota,
    PK: project_Bison.PK,
    SK: user_NaokiOota.PK,
    type: 'project-user',
  },
  {
    ...project_Bison,
    ...user_ShuuheiHanashiro,
    PK: project_Bison.PK,
    SK: user_ShuuheiHanashiro.PK,
    type: 'project-user',
  },
];

export const projectUserItems = [
  user_HirokazuMotegi,
  user_KentaToshima,
  user_RyoutaYamaura,
  user_KeitaSakai,
  user_NaokiOota,
  user_ShuuheiHanashiro,
  project_Bison,
  ...projectUserMapping_Bison,
];
