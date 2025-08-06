import { queryParams, type QueryParams } from './../../../../wayfinder';
/**
 * @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:17
 * @route '/dice'
 */
const DiceController = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}): {
  url: string;
  method: 'get';
} => ({
  url: DiceController.url(options),
  method: 'get',
});

DiceController.definition = {
  methods: ['get', 'head'],
  url: '/dice',
};

/**
 * @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:17
 * @route '/dice'
 */
DiceController.url = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}) => {
  return DiceController.definition.url + queryParams(options);
};

/**
 * @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:17
 * @route '/dice'
 */
DiceController.get = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}): {
  url: string;
  method: 'get';
} => ({
  url: DiceController.url(options),
  method: 'get',
});
/**
 * @see \App\Http\Controllers\DiceController::__invoke
 * @see app/Http/Controllers/DiceController.php:17
 * @route '/dice'
 */
DiceController.head = (options?: {
  query?: QueryParams;
  mergeQuery?: QueryParams;
}): {
  url: string;
  method: 'head';
} => ({
  url: DiceController.url(options),
  method: 'head',
});
export default DiceController;
