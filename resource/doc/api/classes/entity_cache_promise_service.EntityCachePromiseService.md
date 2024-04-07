[@beecode/msh-entity](../README.md) / [entity-cache/promise-service](../modules/entity_cache_promise_service.md) / EntityCachePromiseService

# Class: EntityCachePromiseService\<ENTITY, ID\>

[entity-cache/promise-service](../modules/entity_cache_promise_service.md).EntityCachePromiseService

## Type parameters

| Name | Type |
| :------ | :------ |
| `ENTITY` | `ENTITY` |
| `ID` | extends `string` \| `number` = `string` |

## Table of contents

### Constructors

- [constructor](entity_cache_promise_service.EntityCachePromiseService.md#constructor)

### Properties

- [\_dao](entity_cache_promise_service.EntityCachePromiseService.md#_dao)
- [\_timeoutOffsetMs](entity_cache_promise_service.EntityCachePromiseService.md#_timeoutoffsetms)

### Methods

- [\_entityAsync](entity_cache_promise_service.EntityCachePromiseService.md#_entityasync)
- [forceRefresh](entity_cache_promise_service.EntityCachePromiseService.md#forcerefresh)
- [subscribeToEntityChangeById](entity_cache_promise_service.EntityCachePromiseService.md#subscribetoentitychangebyid)

## Constructors

### constructor

• **new EntityCachePromiseService**\<`ENTITY`, `ID`\>(`dao?`): [`EntityCachePromiseService`](entity_cache_promise_service.EntityCachePromiseService.md)\<`ENTITY`, `ID`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `ENTITY` | `ENTITY` |
| `ID` | extends `string` \| `number` = `string` |

#### Parameters

| Name | Type |
| :------ | :------ |
| `dao?` | [`EntityCacheMemory`](entity_cache_memory.EntityCacheMemory.md)\<`ENTITY`\> |

#### Returns

[`EntityCachePromiseService`](entity_cache_promise_service.EntityCachePromiseService.md)\<`ENTITY`, `ID`\>

#### Defined in

[entity-cache/promise-service.ts:9](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/promise-service.ts#L9)

## Properties

### \_dao

• `Protected` `Readonly` **\_dao**: [`EntityCacheMemory`](entity_cache_memory.EntityCacheMemory.md)\<`ENTITY`\>

#### Defined in

[entity-cache/promise-service.ts:4](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/promise-service.ts#L4)

___

### \_timeoutOffsetMs

• `Protected` `Optional` `Readonly` `Abstract` **\_timeoutOffsetMs**: `number`

#### Defined in

[entity-cache/promise-service.ts:6](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/promise-service.ts#L6)

## Methods

### \_entityAsync

▸ **_entityAsync**(`id`): `Promise`\<`ENTITY`\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `ID` |

#### Returns

`Promise`\<`ENTITY`\>

#### Defined in

[entity-cache/promise-service.ts:7](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/promise-service.ts#L7)

___

### forceRefresh

▸ **forceRefresh**(`id`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `id` | `ID` |

#### Returns

`void`

#### Defined in

[entity-cache/promise-service.ts:33](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/promise-service.ts#L33)

___

### subscribeToEntityChangeById

▸ **subscribeToEntityChangeById**(`id`, `callback`): [`EntityCacheSubscription`](../modules/entity_cache_memory.md#entitycachesubscription)

Subscribe to entity cache change and retrieve cached value if not undefined

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `ID` | entity unique identifier |
| `callback` | [`EntityCacheCallBack`](../modules/entity_cache_memory.md#entitycachecallback)\<`ENTITY`\> |  |

#### Returns

[`EntityCacheSubscription`](../modules/entity_cache_memory.md#entitycachesubscription)

#### Defined in

[entity-cache/promise-service.ts:19](https://github.com/beecode-rs/msh-entity/blob/f63d8a8/src/entity-cache/promise-service.ts#L19)
