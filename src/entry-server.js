import { createApp } from './main'
export default ctx => {
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp();
        const meta = app.$meta()
        router.push(ctx.url);
        router.onReady(() => {
            const machedComponents = router.getMatchedComponents();
            if(!machedComponents.length) {
                return reject({code: 404});
            }
            Promise.all(machedComponents.map(component => {
                if(component.asyncData) {
                    return component.asyncData({
                        store, 
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                ctx.state = store.state;
                ctx.meta = meta
                resolve(app);
            }).catch(reject)
        }, reject)
    })
}