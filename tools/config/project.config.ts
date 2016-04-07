import {join} from 'path';
import {SeedConfig} from './seed.config';
import {InjectableDependency} from './seed.config.interfaces';

export class ProjectConfig extends SeedConfig {
  PROJECT_TASKS_DIR = join(process.cwd(), this.TOOLS_DIR, 'tasks', 'project');
  SYSTEM_CONFIG: any = {
    defaultJSExtensions: true,
    packageConfigPaths: [
      `${this.APP_BASE}node_modules/*/package.json`,
      `${this.APP_BASE}node_modules/@ngrx/store/package.json`
    ],
    paths: {
      'app/*': `${this.APP_BASE}app/*/index`,
      [this.BOOTSTRAP_MODULE]: `${this.APP_BASE}${this.BOOTSTRAP_MODULE}`,
      'angular2/*': `${this.APP_BASE}angular2/*`,
      'rxjs/*': `${this.APP_BASE}rxjs/*`,
      'simple-peer': `${this.APP_BASE}node_modules/simple-peer/simplepeer.min`,
      '*': `${this.APP_BASE}node_modules/*`
    },
    packages: {
      angular2: { defaultExtension: false },
      rxjs: { defaultExtension: false }
    }
  };
  constructor() {
    super();
    // this.APP_TITLE = 'Put name of your app here';
    let additional_deps: InjectableDependency[] = [
      // {src: 'jquery/dist/jquery.min.js', inject: 'libs'},
      // {src: 'lodash/lodash.min.js', inject: 'libs'},
    ];

    const seedDependencies = this.NPM_DEPENDENCIES;

    this.NPM_DEPENDENCIES = seedDependencies.concat(additional_deps);
    this.ASSETS_SRC = `${this.APP_SRC}/app/assets`;

    this.APP_ASSETS = [
      // {src: `${this.ASSETS_SRC}/css/toastr.min.css`, inject: true},
      // {src: `${this.APP_DEST}/assets/scss/global.css`, inject: true},
      { src: `${this.ASSETS_SRC}/main.css`, inject: true },
    ];

  }
}
