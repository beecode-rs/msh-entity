[@beecode/msh-entity](../README.md) / [entity-cache/memory](../modules/entity_cache_memory.md) / EntityCacheMemory

# Class: EntityCacheMemory\<ENTITY\>

[entity-cache/memory](../modules/entity_cache_memory.md).EntityCacheMemory

## Type parameters

| Name |
| :------ |
| `ENTITY` |

## Table of contents

### Constructors

- [constructor](entity_cache_memory.EntityCacheMemory.md#constructor)

### Properties

- [\_memory](entity_cache_memory.EntityCacheMemory.md#_memory)
- [\_subject](entity_cache_memory.EntityCacheMemory.md#_subject)

### Methods

- [\_calculateTimeout](entity_cache_memory.EntityCacheMemory.md#_calculatetimeout)
- [\_timeoutExpired](entity_cache_memory.EntityCacheMemory.md#_timeoutexpired)
- [getById](entity_cache_memory.EntityCacheMemory.md#getbyid)
- [set](entity_cache_memory.EntityCacheMemory.md#set)
- [subscribeById](entity_cache_memory.EntityCacheMemory.md#subscribebyid)

## Constructors

### constructor

• **new EntityCacheMemory**\<`ENTITY`\>(): [`EntityCacheMemory`](entity_cache_memory.EntityCacheMemory.md)\<`ENTITY`\>

#### Type parameters

| Name |
| :------ |
| `ENTITY` |

#### Returns

[`EntityCacheMemory`](entity_cache_memory.EntityCacheMemory.md)\<`ENTITY`\>

## Properties

### \_memory

• `Protected` **\_memory**: `Object` = `{}`

#### Index signature

▪ [k: `string`]: \{ `entity?`: `ENTITY` ; `timeoutMs?`: `number`  }

#### Defined in

[entity-cache/memory.ts:12](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L12)

___

### \_subject

• `Protected` **\_subject**: `Subject`\<[`EntityCache`](../modules/entity_cache_memory.md#entitycache)\<`ENTITY`\>\>

#### Defined in

[entity-cache/memory.ts:13](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L13)

## Methods

### \_calculateTimeout

▸ **_calculateTimeout**(`timeoutOffsetMs?`): `undefined` \| `number`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeoutOffsetMs?` | `number` |

#### Returns

`undefined` \| `number`

#### Defined in

[entity-cache/memory.ts:40](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L40)

___

### \_timeoutExpired

▸ **_timeoutExpired**(`timeoutMs?`): `boolean`

#### Parameters

| Name | Type |
| :------ | :------ |
| `timeoutMs?` | `number` |

#### Returns

`boolean`

#### Defined in

[entity-cache/memory.ts:49](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L49)

___

### getById

▸ **getById**(`id`): `Object`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |

#### Returns

`Object`

| Name | Type |
| :------ | :------ |
| `entity?` | `ENTITY` |
| `needToFetch?` | `boolean` |

#### Defined in

[entity-cache/memory.ts:15](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L15)

___

### set

▸ **set**(`params`, `timeoutOffsetMs?`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `params` | [`EntityCache`](../modules/entity_cache_memory.md#entitycache)\<`ENTITY`\> |
| `timeoutOffsetMs?` | `number` |

#### Returns

`void`

#### Defined in

[entity-cache/memory.ts:29](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L29)

___

### subscribeById

▸ **subscribeById**(`id`, `callback`): [`EntityCacheSubscription`](../modules/entity_cache_memory.md#entitycachesubscription)

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `callback` | (`par`: [`EntityCache`](../modules/entity_cache_memory.md#entitycache)\<`ENTITY`\>) => `void` |

#### Returns

[`EntityCacheSubscription`](../modules/entity_cache_memory.md#entitycachesubscription)

#### Defined in

[entity-cache/memory.ts:36](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/memory.ts#L36)
