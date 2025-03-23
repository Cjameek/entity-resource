import { PartialStateUpdater } from '@ngrx/signals';
import { EntityState, SelectEntityId, addEntities, addEntity, removeEntities, removeEntity, setAllEntities, setEntities, setEntity, updateEntities, updateEntity } from '@ngrx/signals/entities';
import { EntityQueryKey } from '../entity-resource';

/**
 * Create config object for use with NgRx state updated methods
 */
export function createConfig<T>(entity: T, selectId: SelectEntityId<T>) {
    return {
        entity,
        selectId
    }
}

/**
 * Receive query key value and determine which NgRx state updated method to run at the end of entity query async call.
 */
export function entityStateUpdater<T>(queryKey: EntityQueryKey, config: any): EntityState<T> {
    let partialFn!: PartialStateUpdater<EntityState<any>>;

    switch (queryKey) {
        case 'addOneQuery':
            partialFn = addEntity(config);
            break;
        case 'addManyQuery':
            partialFn = addEntities(config);
            break;
        case 'setOneQuery':
            partialFn = setEntity(config);
            break;
        case 'setManyQuery':
            partialFn = setEntities(config);
            break;
        case 'setAllQuery':
            partialFn = setAllEntities(config);
            break;
        case 'updateOneQuery':
            partialFn = updateEntity(config);
            break;
        case 'updateManyQuery':
            partialFn = updateEntities(config);
            break;
        case 'removeOneQuery':
            partialFn = removeEntity(config);
            break;
        case 'removeManyQuery':
            partialFn = removeEntities(config);
            break;
    }

    if (typeof partialFn != 'undefined') {
        return {
            ids: partialFn(config.value)?.ids ?? [],
            entityMap: partialFn(config.value)?.entityMap ?? {},
        };
    }

    return {
        ids: [],
        entityMap: {}
    };
}