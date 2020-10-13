
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'config/backup', name: 'Config Backups', component: () => import('pages/BackupConfig.vue') },
      { path: 'config/fileSystem/:drive/settings', name: 'Drive settings', component: () => import('pages/fs/Exclude.vue') },
      { path: 'config/fileSystem/:drive/exclude', name: 'Exclude file/folder', component: () => import('pages/fs/Exclude.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
