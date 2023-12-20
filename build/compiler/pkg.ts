// eslint-disable-next-line @typescript-eslint/no-var-requires
import { exec } from 'pkg';

const target = [process.env.PKG_NODE_VERSION || 'latest'].join('-');
exec(['.', '--target', target]);
