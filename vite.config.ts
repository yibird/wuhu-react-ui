// import { defineConfig, build } from 'vite';
// import react from '@vitejs/plugin-react';
// import { resolve } from 'node:path';
// import { readdirSync, statSync } from 'node:fs';
// import dts from 'vite-plugin-dts';

// const packagesDir = resolve(__dirname, 'packages');

// /**
//  * 获取所有 packages 下的子目录
//  */
// const getPackages = () =>
// 	readdirSync(packagesDir).filter((dir) =>
// 		statSync(resolve(packagesDir, dir)).isDirectory(),
// 	);

// /**
//  * 批量构建所有 packages
//  */
// async function buildAll() {
// 	const packages = getPackages();

// 	for (const pkg of packages) {
// 		const entry = resolve(packagesDir, pkg, 'src/index.ts');
// 		const outDir = resolve(packagesDir, pkg, 'dist');

// 		console.log(`📦 Building package: ${pkg}`);

// 		await build({
// 			plugins: [
// 				react(),
// 				dts({
// 					outDir,
// 					tsconfigPath: './tsconfig.json',
// 					rollupTypes: true,
// 				}),
// 			],
// 			build: {
// 				outDir,
// 				emptyOutDir: true,
// 				lib: {
// 					entry,
// 					name: pkg, // 用于 umd 的全局变量名，可自定义
// 					fileName: (format) => `index.${format}.js`,
// 					formats: ['es', 'umd'],
// 				},
// 				rollupOptions: {
// 					external: [
// 						'react',
// 						'react-dom',
// 						'dayjs', // ✅ time 包用到 dayjs，要 external 掉
// 					],
// 					output: {
// 						globals: {
// 							react: 'React',
// 							'react-dom': 'ReactDOM',
// 							dayjs: 'dayjs',
// 						},
// 					},
// 				},
// 			},
// 		});
// 	}
// }

// /**
//  * 默认导出给 vite CLI 用（单包调试）
//  */
// export default defineConfig({
// 	plugins: [react()],
// 	build: {
// 		rollupOptions: {
// 			input: {},
// 		},
// 	},
// });

// /**
//  * 如果执行 `BUILD_ALL=1 vite build`，则构建所有包
//  */
// if (process.env.BUILD_ALL) {
// 	buildAll().then(() => console.log('✅ All packages built successfully'));
// }
