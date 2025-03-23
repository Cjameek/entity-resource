import { assertInInjectionContext, PromiseResourceOptions, Resource, ResourceOptions, Signal } from "@angular/core";
import { RxResourceOptions } from "@angular/core/rxjs-interop";

export interface EntityDictionary<T> {
    [id: string]: T | undefined;
}

export interface EntityState<T> {
    ids: string[] | number[];
    entitiesMap: EntityDictionary<T>;
}

export interface EntityResourceValue<T> {
    ids: Signal<string[]>,
    entities: Signal<T[]>
    entitiesMap: Signal<EntityDictionary<T>>
}

export type EntityQueryType = 'addOne' | 'addMany' | 'setOne' | 'setMany' | 'setAll' | 'updateOne' | 'updateMany' | 'removeOne' | 'removeMany' | 'removeAll';

export type EntityQueryKey = `${EntityQueryType}Query`;

/**
 * Defines an object with a dynamic ***query*** key matching the NgRx Entity state updater fn name.
 * 
 * The loader can either be a ```Promise<T>``` or ```Observable<T>.```
 * 
 * @experimental
 */
export type EntityStateQuery<T, R> = {
    [key in EntityQueryKey]?: PromiseResourceOptions<T, R> |  RxResourceOptions<T, R>
};

export type EntityResourceOpts<T, R> = ResourceOptions<T, R> & {
    entityQueries: EntityStateQuery<T, R>,
    selectId: string,
}

/**
 * Override ```value``` prop on ```Resource<T>``` interface.
 */
export type EntityResourceBaseRef<T> = Omit<Resource<T>, 'value'> & { value: Signal<EntityResourceValue<T>> };
export interface EntityResourceRef<T, R> extends EntityResourceBaseRef<T> {
    queries: EntityStateQuery<T, R>,
    selectId?: string,
    value: Signal<EntityResourceValue<T>>
}

declare function entityResource<T, R>(options: EntityResourceOpts<T, R> ): EntityResource<T, R> {
    options?.injector || assertInInjectionContext(entityResource);
    
    return new EntityResource();
}

export class EntityResource<T, R> {
    // Build out implementation
    constructor(){}
}