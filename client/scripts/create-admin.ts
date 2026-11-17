// 管理者を作る。ユーザーが1人もいない状態で管理画面が開いたままにならないよう、環境ごとに一度だけ使う。
// 実行方法：ADMIN_EMAIL=... ADMIN_PASSWORD=... npx payload run scripts/create-admin.ts
import { getPayload } from 'payload';

import config from '../src/payload.config';

const { ADMIN_EMAIL: email, ADMIN_PASSWORD: password } = process.env;
if (!email || !password) {
    console.error('Set ADMIN_EMAIL and ADMIN_PASSWORD.');
    process.exit(1);
}

const payload = await getPayload({ config });

const { totalDocs } = await payload.count({
    collection: 'users',
    where: { email: { equals: email } },
});
if (totalDocs > 0) {
    console.error(`${email} already exists. Nothing was changed.`);
    process.exit(1);
}

const user = await payload.create({
    collection: 'users',
    data: { email, password, role: 'admin' },
});
console.log(`Created admin ${user.email} (id ${user.id}).`);

process.exit(0);
