import {WorkspaceComponent} from './workspace.component';
import {PageNotFoundComponent} from '../not-found.component';

export const workspaceRoutes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '', redirectTo: 'data-table', pathMatch: 'full'
      },
      {
        path: 'data-table',
        loadChildren: '../data-table/data-table.module#MyDataTableModule',
        data: {preload: true}
      },
      {
        path: 'editor',
        loadChildren: '../editor/editor.module#EditorModule',
        data: {preload: true}
      },
      {
        path: 'collection',
        loadChildren: '../collection/collection.module#CollectionModule',
        data: {preload: true}
      },
      {
        path: 'template',
        loadChildren: '../template/template.module#TemplateModule',
        data: {preload: true}
      },
      {
        path: '**',
        component: PageNotFoundComponent
      },
    ]
  }
];
