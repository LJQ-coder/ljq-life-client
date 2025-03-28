import { ref, watch, type Ref } from 'vue';

export function useVModel<T, K extends string>(
    props: { [P in K]: T },
    emits: (event: `update:${K}`, ...args: any[]) => void,
    propName: K
): Ref<T> {
    const localValue = ref(props[propName]) as Ref<T>;
    
    // 监听 props 变化，更新本地值
    watch(() => props[propName], (newValue: T) => {
        localValue.value = newValue;
    });

    // 监听本地值变化，触发更新事件
    watch(localValue, (newValue: T) => {
        emits(`update:${propName}`, newValue);
    }, { deep: true });

    // 根据类型决定监听方式
    // if (typeof localValue.value === 'object' && localValue.value !== null) {
    //     // 如果是对象类型，监听每一项的变化
    //     Object.keys(localValue.value as Record<string, any>).forEach(key => {
    //         watch(() => (localValue.value as Record<string, any>)[key], (newValue) => {
    //             emits(`update:${propName}`, { ...localValue.value });
    //         });
    //     });
    // }

    return localValue;
}
