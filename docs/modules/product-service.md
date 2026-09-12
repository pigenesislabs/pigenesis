# Product Service

## Purpose

The Product Service is responsible for managing product data and providing a single data-access boundary between the UI and product persistence.

The UI should not directly manage product storage.

Current architecture:

React UI → Product Pages → Product Service → localStorage

Future architecture:

React UI → Product Pages → Product Service → API → Backend → Database

---

## Product Data

A Product contains:

- `id`
- `name`
- `status`
- `description`
- `category`

The Product ID is the stable identifier of the product and must not be changed during editing.

---

## Supported Operations

### Create

`createProduct(input)`

Creates a new product after validating the supplied input.

The service:

1. Validates the product data.
2. Loads the current stored products.
3. Checks for duplicate Product ID.
4. Creates the product.
5. Saves the updated product list.
6. Updates the in-memory product reference.
7. Dispatches the product update event.
8. Logs the operation.

---

### Read

`getProducts()`

Loads the current product data from storage.

`getProductById(productId)`

Retrieves a product using its stable Product ID.

Both operations use the service layer rather than allowing pages to access storage directly.

---

### Update

`updateProduct(productId, updates)`

Updates an existing product.

The Product ID remains immutable.

Editable fields are:

- Name
- Category
- Status
- Description

The service validates the update before saving the modified product.

---

### Delete

`deleteProduct(productId)`

Deletes an existing product.

The service first loads the current persisted product data before performing the deletion. This prevents deletion from relying on potentially stale in-memory data.

If the product does not exist, the operation returns `false` and records a diagnostic error.

---

## Validation

Product creation validates:

- Product ID is required.
- Product ID may contain only lowercase letters, numbers, and hyphens.
- Product name is required.
- Product description is required.
- Product category is required.
- Product status must be valid.

Product updates validate:

- Product name.
- Product description.
- Product category.
- Product status.

Validation failures use the application error system.

---

## Error Handling

The Product Service uses the centralized application error system.

Supported error categories include:

- `VALIDATION_ERROR`
- `NOT_FOUND`
- `DUPLICATE`
- `STORAGE_ERROR`
- `NETWORK_ERROR`
- `UNAUTHORIZED`
- `FORBIDDEN`
- `UNKNOWN_ERROR`

Currently the Product Service actively uses:

- `VALIDATION_ERROR`
- `DUPLICATE`
- `STORAGE_ERROR`

---

## Persistence

Current persistence uses browser `localStorage`.

Storage key:

`pigenesis_products`

The storage implementation is isolated inside the Product Service.

The UI does not directly read or write the storage key.

This allows the persistence mechanism to be replaced later without requiring major changes to the UI.

Future persistence may use:

- API
- Backend service
- Database

---

## Storage Error Handling

Storage reads and writes are protected with error handling.

If storage access fails:

1. The error is logged.
2. A `STORAGE_ERROR` application error is created.
3. The error is propagated to the calling layer.

If stored product JSON is malformed, the service logs the problem and restores the default product data.

---

## Logging

The Product Service uses the centralized logger.

Important operations are logged with contextual information such as:

- Operation name
- Product ID
- Error code
- Original error

Example operations:

- `createProduct`
- `updateProduct`
- `deleteProduct`
- `readProductsFromStorage`
- `saveProductsToStorage`
- `loadProducts`

---

## Reactive Updates

After successful create, update, or delete operations, the service dispatches:

`pigenesis-products-updated`

Pages can listen for this event and refresh their product data.

This allows multiple UI areas to remain synchronized with product changes.

---

## Testing

The Product Service currently has automated tests covering:

- Default product loading
- Product creation
- Duplicate Product ID protection
- Product retrieval
- Missing product handling
- Product deletion
- Deletion of a non-existent product
- Current-storage deletion consistency
- Create validation
- Storage read failures
- Storage write failures

Current test status:

**35 / 35 tests passing**

---

## Architectural Principle

The Product Service is the boundary between the UI and product data.

The core principle is:

> UI consumes data. UI does not own data.

This boundary is intentionally designed so that the current localStorage implementation can later be replaced by a backend persistence layer without redesigning the Product UI.