# icons

```js
    import iconName, {size, groupName} from '@cluue/icons/line/eye.svg?clue' //ClueSvgIconData

    <Icon icon={iconName} {...size}> //width:size.width; height:size.height;
    <Icon icon={iconName} width={24}> //width:24; height:24;
    <Icon icon={iconName} width={24} height={40}> //width:24; height:40;
```

```ts
    export type ClueSvgIconData {
        default: string //Все имена иконок
        size: {
            width: number
            height: number
        }
        groupName: string //Все группы иконок
    }
```
