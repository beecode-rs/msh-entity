[@beecode/msh-entity](../README.md) / entity-cache/memory

# Module: entity-cache/memory

## Table of contents

### Classes

- [EntityCacheMemory](../classes/entity_cache_memory.EntityCacheMemory.md)

### Type Aliases

- [EntityCache](entity_cache_memory.md#entitycache)
- [EntityCacheCallBack](entity_cache_memory.md#entitycachecallback)
- [EntityCacheSubscription](entity_cache_memory.md#entitycachesubscription)

## Type Aliases

### EntityCache

Ƭ **EntityCache**\<`ENTITY`\>: `Object`

#### Type parameters

| Name |
| :------ |
| `ENTITY` |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `entity` | `ENTITY` |
| `id` | `string` |

#### Defined in

[entity-cache/memory.ts:5](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L5)

___

### EntityCacheCallBack

Ƭ **EntityCacheCallBack**\<`ENTITY`\>: (`cbParams`: [`EntityCache`](entity_cache_memory.md#entitycache)\<`ENTITY`\>) => `void`

#### Type parameters

| Name |
| :------ |
| `ENTITY` |

#### Type declaration

▸ (`cbParams`): `void`

##### Parameters

| Name | Type |
| :------ | :------ |
| `cbParams` | [`EntityCache`](entity_cache_memory.md#entitycache)\<`ENTITY`\> |

##### Returns

`void`

#### Defined in

[entity-cache/memory.ts:7](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L7)

___

### EntityCacheSubscription

Ƭ **EntityCacheSubscription**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `unsubscribe` | () => `void` |

#### Defined in

[entity-cache/memory.ts:9](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L9)
