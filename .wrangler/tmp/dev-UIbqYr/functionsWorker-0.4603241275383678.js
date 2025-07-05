var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/bundle-eYNu59/checked-fetch.js
var urls = /* @__PURE__ */ new Set();
function checkURL(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls.has(url.toString())) {
      urls.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL, "checkURL");
globalThis.fetch = new Proxy(globalThis.fetch, {
  apply(target, thisArg, argArray) {
    const [request, init] = argArray;
    checkURL(request, init);
    return Reflect.apply(target, thisArg, argArray);
  }
});

// .wrangler/tmp/pages-dsON7z/functionsWorker-0.4603241275383678.mjs
var __defProp2 = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __defNormalProp = /* @__PURE__ */ __name((obj, key, value) => key in obj ? __defProp2(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value, "__defNormalProp");
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __esm = /* @__PURE__ */ __name((fn, res) => /* @__PURE__ */ __name(function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
}, "__init"), "__esm");
var __publicField = /* @__PURE__ */ __name((obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
}, "__publicField");
function checkURL2(request, init) {
  const url = request instanceof URL ? request : new URL(
    (typeof request === "string" ? new Request(request, init) : request).url
  );
  if (url.port && url.port !== "443" && url.protocol === "https:") {
    if (!urls2.has(url.toString())) {
      urls2.add(url.toString());
      console.warn(
        `WARNING: known issue with \`fetch()\` requests to custom HTTPS ports in published Workers:
 - ${url.toString()} - the custom port will be ignored when the Worker is published using the \`wrangler deploy\` command.
`
      );
    }
  }
}
__name(checkURL2, "checkURL");
var urls2;
var init_checked_fetch = __esm({
  "../.wrangler/tmp/bundle-hLV8mX/checked-fetch.js"() {
    urls2 = /* @__PURE__ */ new Set();
    __name2(checkURL2, "checkURL");
    globalThis.fetch = new Proxy(globalThis.fetch, {
      apply(target, thisArg, argArray) {
        const [request, init] = argArray;
        checkURL2(request, init);
        return Reflect.apply(target, thisArg, argArray);
      }
    });
  }
});
function is(value, type) {
  if (!value || typeof value !== "object") {
    return false;
  }
  if (value instanceof type) {
    return true;
  }
  if (!Object.prototype.hasOwnProperty.call(type, entityKind)) {
    throw new Error(
      `Class "${type.name ?? "<unknown>"}" doesn't look like a Drizzle entity. If this is incorrect and the class is provided by Drizzle, please report this as a bug.`
    );
  }
  let cls = Object.getPrototypeOf(value).constructor;
  if (cls) {
    while (cls) {
      if (entityKind in cls && cls[entityKind] === type[entityKind]) {
        return true;
      }
      cls = Object.getPrototypeOf(cls);
    }
  }
  return false;
}
__name(is, "is");
var entityKind;
var hasOwnEntityKind;
var init_entity = __esm({
  "../node_modules/drizzle-orm/entity.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    entityKind = Symbol.for("drizzle:entityKind");
    hasOwnEntityKind = Symbol.for("drizzle:hasOwnEntityKind");
    __name2(is, "is");
  }
});
var _a;
var ConsoleLogWriter;
var _a2;
var DefaultLogger;
var _a3;
var NoopLogger;
var init_logger = __esm({
  "../node_modules/drizzle-orm/logger.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    ConsoleLogWriter = /* @__PURE__ */ __name(class {
      write(message) {
        console.log(message);
      }
    }, "ConsoleLogWriter");
    __name2(ConsoleLogWriter, "ConsoleLogWriter");
    _a = entityKind;
    __publicField(ConsoleLogWriter, _a, "ConsoleLogWriter");
    DefaultLogger = /* @__PURE__ */ __name(class {
      writer;
      constructor(config) {
        this.writer = config?.writer ?? new ConsoleLogWriter();
      }
      logQuery(query, params) {
        const stringifiedParams = params.map((p) => {
          try {
            return JSON.stringify(p);
          } catch {
            return String(p);
          }
        });
        const paramsStr = stringifiedParams.length ? ` -- params: [${stringifiedParams.join(", ")}]` : "";
        this.writer.write(`Query: ${query}${paramsStr}`);
      }
    }, "DefaultLogger");
    __name2(DefaultLogger, "DefaultLogger");
    _a2 = entityKind;
    __publicField(DefaultLogger, _a2, "DefaultLogger");
    NoopLogger = /* @__PURE__ */ __name(class {
      logQuery() {
      }
    }, "NoopLogger");
    __name2(NoopLogger, "NoopLogger");
    _a3 = entityKind;
    __publicField(NoopLogger, _a3, "NoopLogger");
  }
});
var TableName;
var init_table_utils = __esm({
  "../node_modules/drizzle-orm/table.utils.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    TableName = Symbol.for("drizzle:Name");
  }
});
function getTableName(table) {
  return table[TableName];
}
__name(getTableName, "getTableName");
function getTableUniqueName(table) {
  return `${table[Schema] ?? "public"}.${table[TableName]}`;
}
__name(getTableUniqueName, "getTableUniqueName");
var Schema;
var Columns;
var ExtraConfigColumns;
var OriginalName;
var BaseName;
var IsAlias;
var ExtraConfigBuilder;
var IsDrizzleTable;
var _a4;
var Table;
var init_table = __esm({
  "../node_modules/drizzle-orm/table.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table_utils();
    Schema = Symbol.for("drizzle:Schema");
    Columns = Symbol.for("drizzle:Columns");
    ExtraConfigColumns = Symbol.for("drizzle:ExtraConfigColumns");
    OriginalName = Symbol.for("drizzle:OriginalName");
    BaseName = Symbol.for("drizzle:BaseName");
    IsAlias = Symbol.for("drizzle:IsAlias");
    ExtraConfigBuilder = Symbol.for("drizzle:ExtraConfigBuilder");
    IsDrizzleTable = Symbol.for("drizzle:IsDrizzleTable");
    Table = /* @__PURE__ */ __name(class {
      /**
       * @internal
       * Can be changed if the table is aliased.
       */
      [(_a4 = entityKind, TableName)];
      /**
       * @internal
       * Used to store the original name of the table, before any aliasing.
       */
      [OriginalName];
      /** @internal */
      [Schema];
      /** @internal */
      [Columns];
      /** @internal */
      [ExtraConfigColumns];
      /**
       *  @internal
       * Used to store the table name before the transformation via the `tableCreator` functions.
       */
      [BaseName];
      /** @internal */
      [IsAlias] = false;
      /** @internal */
      [IsDrizzleTable] = true;
      /** @internal */
      [ExtraConfigBuilder] = void 0;
      constructor(name, schema, baseName) {
        this[TableName] = this[OriginalName] = name;
        this[Schema] = schema;
        this[BaseName] = baseName;
      }
    }, "Table");
    __name2(Table, "Table");
    __publicField(Table, _a4, "Table");
    __publicField(Table, "Symbol", {
      Name: TableName,
      Schema,
      OriginalName,
      Columns,
      ExtraConfigColumns,
      BaseName,
      IsAlias,
      ExtraConfigBuilder
    });
    __name2(getTableName, "getTableName");
    __name2(getTableUniqueName, "getTableUniqueName");
  }
});
var _a5;
var Column;
var init_column = __esm({
  "../node_modules/drizzle-orm/column.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    Column = /* @__PURE__ */ __name(class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
        this.name = config.name;
        this.keyAsName = config.keyAsName;
        this.notNull = config.notNull;
        this.default = config.default;
        this.defaultFn = config.defaultFn;
        this.onUpdateFn = config.onUpdateFn;
        this.hasDefault = config.hasDefault;
        this.primary = config.primaryKey;
        this.isUnique = config.isUnique;
        this.uniqueName = config.uniqueName;
        this.uniqueType = config.uniqueType;
        this.dataType = config.dataType;
        this.columnType = config.columnType;
        this.generated = config.generated;
        this.generatedIdentity = config.generatedIdentity;
      }
      name;
      keyAsName;
      primary;
      notNull;
      default;
      defaultFn;
      onUpdateFn;
      hasDefault;
      isUnique;
      uniqueName;
      uniqueType;
      dataType;
      columnType;
      enumValues = void 0;
      generated = void 0;
      generatedIdentity = void 0;
      config;
      mapFromDriverValue(value) {
        return value;
      }
      mapToDriverValue(value) {
        return value;
      }
      // ** @internal */
      shouldDisableInsert() {
        return this.config.generated !== void 0 && this.config.generated.type !== "byDefault";
      }
    }, "Column");
    __name2(Column, "Column");
    _a5 = entityKind;
    __publicField(Column, _a5, "Column");
  }
});
var _a6;
var ColumnBuilder;
var init_column_builder = __esm({
  "../node_modules/drizzle-orm/column-builder.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    ColumnBuilder = /* @__PURE__ */ __name(class {
      config;
      constructor(name, dataType, columnType) {
        this.config = {
          name,
          keyAsName: name === "",
          notNull: false,
          default: void 0,
          hasDefault: false,
          primaryKey: false,
          isUnique: false,
          uniqueName: void 0,
          uniqueType: void 0,
          dataType,
          columnType,
          generated: void 0
        };
      }
      /**
       * Changes the data type of the column. Commonly used with `json` columns. Also, useful for branded types.
       *
       * @example
       * ```ts
       * const users = pgTable('users', {
       * 	id: integer('id').$type<UserId>().primaryKey(),
       * 	details: json('details').$type<UserDetails>().notNull(),
       * });
       * ```
       */
      $type() {
        return this;
      }
      /**
       * Adds a `not null` clause to the column definition.
       *
       * Affects the `select` model of the table - columns *without* `not null` will be nullable on select.
       */
      notNull() {
        this.config.notNull = true;
        return this;
      }
      /**
       * Adds a `default <value>` clause to the column definition.
       *
       * Affects the `insert` model of the table - columns *with* `default` are optional on insert.
       *
       * If you need to set a dynamic default value, use {@link $defaultFn} instead.
       */
      default(value) {
        this.config.default = value;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Adds a dynamic default value to the column.
       * The function will be called when the row is inserted, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $defaultFn(fn) {
        this.config.defaultFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $defaultFn}.
       */
      $default = this.$defaultFn;
      /**
       * Adds a dynamic update value to the column.
       * The function will be called when the row is updated, and the returned value will be used as the column value if none is provided.
       * If no `default` (or `$defaultFn`) value is provided, the function will be called when the row is inserted as well, and the returned value will be used as the column value.
       *
       * **Note:** This value does not affect the `drizzle-kit` behavior, it is only used at runtime in `drizzle-orm`.
       */
      $onUpdateFn(fn) {
        this.config.onUpdateFn = fn;
        this.config.hasDefault = true;
        return this;
      }
      /**
       * Alias for {@link $onUpdateFn}.
       */
      $onUpdate = this.$onUpdateFn;
      /**
       * Adds a `primary key` clause to the column definition. This implicitly makes the column `not null`.
       *
       * In SQLite, `integer primary key` implicitly makes the column auto-incrementing.
       */
      primaryKey() {
        this.config.primaryKey = true;
        this.config.notNull = true;
        return this;
      }
      /** @internal Sets the name of the column to the key within the table definition if a name was not given. */
      setName(name) {
        if (this.config.name !== "")
          return;
        this.config.name = name;
      }
    }, "ColumnBuilder");
    __name2(ColumnBuilder, "ColumnBuilder");
    _a6 = entityKind;
    __publicField(ColumnBuilder, _a6, "ColumnBuilder");
  }
});
var _a7;
var ForeignKeyBuilder;
var _a8;
var ForeignKey;
var init_foreign_keys = __esm({
  "../node_modules/drizzle-orm/pg-core/foreign-keys.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table_utils();
    ForeignKeyBuilder = /* @__PURE__ */ __name(class {
      /** @internal */
      reference;
      /** @internal */
      _onUpdate = "no action";
      /** @internal */
      _onDelete = "no action";
      constructor(config, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action === void 0 ? "no action" : action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action === void 0 ? "no action" : action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey(table, this);
      }
    }, "ForeignKeyBuilder");
    __name2(ForeignKeyBuilder, "ForeignKeyBuilder");
    _a7 = entityKind;
    __publicField(ForeignKeyBuilder, _a7, "PgForeignKeyBuilder");
    ForeignKey = /* @__PURE__ */ __name(class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[TableName],
          ...columnNames,
          foreignColumns[0].table[TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    }, "ForeignKey");
    __name2(ForeignKey, "ForeignKey");
    _a8 = entityKind;
    __publicField(ForeignKey, _a8, "PgForeignKey");
  }
});
function iife(fn, ...args) {
  return fn(...args);
}
__name(iife, "iife");
var init_tracing_utils = __esm({
  "../node_modules/drizzle-orm/tracing-utils.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    __name2(iife, "iife");
  }
});
function uniqueKeyName(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
__name(uniqueKeyName, "uniqueKeyName");
var _a9;
var UniqueConstraintBuilder;
var _a10;
var UniqueOnConstraintBuilder;
var _a11;
var UniqueConstraint;
var init_unique_constraint = __esm({
  "../node_modules/drizzle-orm/pg-core/unique-constraint.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table_utils();
    __name2(uniqueKeyName, "uniqueKeyName");
    UniqueConstraintBuilder = /* @__PURE__ */ __name(class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      /** @internal */
      columns;
      /** @internal */
      nullsNotDistinctConfig = false;
      nullsNotDistinct() {
        this.nullsNotDistinctConfig = true;
        return this;
      }
      /** @internal */
      build(table) {
        return new UniqueConstraint(table, this.columns, this.nullsNotDistinctConfig, this.name);
      }
    }, "UniqueConstraintBuilder");
    __name2(UniqueConstraintBuilder, "UniqueConstraintBuilder");
    _a9 = entityKind;
    __publicField(UniqueConstraintBuilder, _a9, "PgUniqueConstraintBuilder");
    UniqueOnConstraintBuilder = /* @__PURE__ */ __name(class {
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder(columns, this.name);
      }
    }, "UniqueOnConstraintBuilder");
    __name2(UniqueOnConstraintBuilder, "UniqueOnConstraintBuilder");
    _a10 = entityKind;
    __publicField(UniqueOnConstraintBuilder, _a10, "PgUniqueOnConstraintBuilder");
    UniqueConstraint = /* @__PURE__ */ __name(class {
      constructor(table, columns, nullsNotDistinct, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName(this.table, this.columns.map((column) => column.name));
        this.nullsNotDistinct = nullsNotDistinct;
      }
      columns;
      name;
      nullsNotDistinct = false;
      getName() {
        return this.name;
      }
    }, "UniqueConstraint");
    __name2(UniqueConstraint, "UniqueConstraint");
    _a11 = entityKind;
    __publicField(UniqueConstraint, _a11, "PgUniqueConstraint");
  }
});
function parsePgArrayValue(arrayString, startFrom, inQuotes) {
  for (let i = startFrom; i < arrayString.length; i++) {
    const char = arrayString[i];
    if (char === "\\") {
      i++;
      continue;
    }
    if (char === '"') {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i + 1];
    }
    if (inQuotes) {
      continue;
    }
    if (char === "," || char === "}") {
      return [arrayString.slice(startFrom, i).replace(/\\/g, ""), i];
    }
  }
  return [arrayString.slice(startFrom).replace(/\\/g, ""), arrayString.length];
}
__name(parsePgArrayValue, "parsePgArrayValue");
function parsePgNestedArray(arrayString, startFrom = 0) {
  const result = [];
  let i = startFrom;
  let lastCharIsComma = false;
  while (i < arrayString.length) {
    const char = arrayString[i];
    if (char === ",") {
      if (lastCharIsComma || i === startFrom) {
        result.push("");
      }
      lastCharIsComma = true;
      i++;
      continue;
    }
    lastCharIsComma = false;
    if (char === "\\") {
      i += 2;
      continue;
    }
    if (char === '"') {
      const [value2, startFrom2] = parsePgArrayValue(arrayString, i + 1, true);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    if (char === "}") {
      return [result, i + 1];
    }
    if (char === "{") {
      const [value2, startFrom2] = parsePgNestedArray(arrayString, i + 1);
      result.push(value2);
      i = startFrom2;
      continue;
    }
    const [value, newStartFrom] = parsePgArrayValue(arrayString, i, false);
    result.push(value);
    i = newStartFrom;
  }
  return [result, i];
}
__name(parsePgNestedArray, "parsePgNestedArray");
function parsePgArray(arrayString) {
  const [result] = parsePgNestedArray(arrayString, 1);
  return result;
}
__name(parsePgArray, "parsePgArray");
function makePgArray(array) {
  return `{${array.map((item) => {
    if (Array.isArray(item)) {
      return makePgArray(item);
    }
    if (typeof item === "string") {
      return `"${item.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
    }
    return `${item}`;
  }).join(",")}}`;
}
__name(makePgArray, "makePgArray");
var init_array = __esm({
  "../node_modules/drizzle-orm/pg-core/utils/array.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    __name2(parsePgArrayValue, "parsePgArrayValue");
    __name2(parsePgNestedArray, "parsePgNestedArray");
    __name2(parsePgArray, "parsePgArray");
    __name2(makePgArray, "makePgArray");
  }
});
var _a12;
var PgColumnBuilder;
var _a13;
var PgColumn;
var _a14;
var ExtraConfigColumn;
var _a15;
var IndexedColumn;
var _a16;
var PgArrayBuilder;
var _a17;
var _PgArray;
var PgArray;
var init_common = __esm({
  "../node_modules/drizzle-orm/pg-core/columns/common.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_column_builder();
    init_column();
    init_entity();
    init_foreign_keys();
    init_tracing_utils();
    init_unique_constraint();
    init_array();
    PgColumnBuilder = /* @__PURE__ */ __name(class extends ColumnBuilder {
      foreignKeyConfigs = [];
      array(size) {
        return new PgArrayBuilder(this.config.name, this, size);
      }
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name, config) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        this.config.uniqueType = config?.nulls;
        return this;
      }
      generatedAlwaysAs(as) {
        this.config.generated = {
          as,
          type: "always",
          mode: "stored"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return iife(
            (ref2, actions2) => {
              const builder = new ForeignKeyBuilder(() => {
                const foreignColumn = ref2();
                return { columns: [column], foreignColumns: [foreignColumn] };
              });
              if (actions2.onUpdate) {
                builder.onUpdate(actions2.onUpdate);
              }
              if (actions2.onDelete) {
                builder.onDelete(actions2.onDelete);
              }
              return builder.build(table);
            },
            ref,
            actions
          );
        });
      }
      /** @internal */
      buildExtraConfigColumn(table) {
        return new ExtraConfigColumn(table, this.config);
      }
    }, "PgColumnBuilder");
    __name2(PgColumnBuilder, "PgColumnBuilder");
    _a12 = entityKind;
    __publicField(PgColumnBuilder, _a12, "PgColumnBuilder");
    PgColumn = /* @__PURE__ */ __name(class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
    }, "PgColumn");
    __name2(PgColumn, "PgColumn");
    _a13 = entityKind;
    __publicField(PgColumn, _a13, "PgColumn");
    ExtraConfigColumn = /* @__PURE__ */ __name(class extends PgColumn {
      getSQLType() {
        return this.getSQLType();
      }
      indexConfig = {
        order: this.config.order ?? "asc",
        nulls: this.config.nulls ?? "last",
        opClass: this.config.opClass
      };
      defaultConfig = {
        order: "asc",
        nulls: "last",
        opClass: void 0
      };
      asc() {
        this.indexConfig.order = "asc";
        return this;
      }
      desc() {
        this.indexConfig.order = "desc";
        return this;
      }
      nullsFirst() {
        this.indexConfig.nulls = "first";
        return this;
      }
      nullsLast() {
        this.indexConfig.nulls = "last";
        return this;
      }
      /**
       * ### PostgreSQL documentation quote
       *
       * > An operator class with optional parameters can be specified for each column of an index.
       * The operator class identifies the operators to be used by the index for that column.
       * For example, a B-tree index on four-byte integers would use the int4_ops class;
       * this operator class includes comparison functions for four-byte integers.
       * In practice the default operator class for the column's data type is usually sufficient.
       * The main point of having operator classes is that for some data types, there could be more than one meaningful ordering.
       * For example, we might want to sort a complex-number data type either by absolute value or by real part.
       * We could do this by defining two operator classes for the data type and then selecting the proper class when creating an index.
       * More information about operator classes check:
       *
       * ### Useful links
       * https://www.postgresql.org/docs/current/sql-createindex.html
       *
       * https://www.postgresql.org/docs/current/indexes-opclass.html
       *
       * https://www.postgresql.org/docs/current/xindex.html
       *
       * ### Additional types
       * If you have the `pg_vector` extension installed in your database, you can use the
       * `vector_l2_ops`, `vector_ip_ops`, `vector_cosine_ops`, `vector_l1_ops`, `bit_hamming_ops`, `bit_jaccard_ops`, `halfvec_l2_ops`, `sparsevec_l2_ops` options, which are predefined types.
       *
       * **You can always specify any string you want in the operator class, in case Drizzle doesn't have it natively in its types**
       *
       * @param opClass
       * @returns
       */
      op(opClass) {
        this.indexConfig.opClass = opClass;
        return this;
      }
    }, "ExtraConfigColumn");
    __name2(ExtraConfigColumn, "ExtraConfigColumn");
    _a14 = entityKind;
    __publicField(ExtraConfigColumn, _a14, "ExtraConfigColumn");
    IndexedColumn = /* @__PURE__ */ __name(class {
      constructor(name, keyAsName, type, indexConfig) {
        this.name = name;
        this.keyAsName = keyAsName;
        this.type = type;
        this.indexConfig = indexConfig;
      }
      name;
      keyAsName;
      type;
      indexConfig;
    }, "IndexedColumn");
    __name2(IndexedColumn, "IndexedColumn");
    _a15 = entityKind;
    __publicField(IndexedColumn, _a15, "IndexedColumn");
    PgArrayBuilder = /* @__PURE__ */ __name(class extends PgColumnBuilder {
      constructor(name, baseBuilder, size) {
        super(name, "array", "PgArray");
        this.config.baseBuilder = baseBuilder;
        this.config.size = size;
      }
      /** @internal */
      build(table) {
        const baseColumn = this.config.baseBuilder.build(table);
        return new PgArray(
          table,
          this.config,
          baseColumn
        );
      }
    }, "PgArrayBuilder");
    __name2(PgArrayBuilder, "PgArrayBuilder");
    _a16 = entityKind;
    __publicField(PgArrayBuilder, _a16, "PgArrayBuilder");
    _PgArray = /* @__PURE__ */ __name(class extends PgColumn {
      constructor(table, config, baseColumn, range) {
        super(table, config);
        this.baseColumn = baseColumn;
        this.range = range;
        this.size = config.size;
      }
      size;
      getSQLType() {
        return `${this.baseColumn.getSQLType()}[${typeof this.size === "number" ? this.size : ""}]`;
      }
      mapFromDriverValue(value) {
        if (typeof value === "string") {
          value = parsePgArray(value);
        }
        return value.map((v) => this.baseColumn.mapFromDriverValue(v));
      }
      mapToDriverValue(value, isNestedArray = false) {
        const a = value.map(
          (v) => v === null ? null : is(this.baseColumn, _PgArray) ? this.baseColumn.mapToDriverValue(v, true) : this.baseColumn.mapToDriverValue(v)
        );
        if (isNestedArray)
          return a;
        return makePgArray(a);
      }
    }, "_PgArray");
    PgArray = _PgArray;
    __name2(PgArray, "PgArray");
    _a17 = entityKind;
    __publicField(PgArray, _a17, "PgArray");
  }
});
function isPgEnum(obj) {
  return !!obj && typeof obj === "function" && isPgEnumSym in obj && obj[isPgEnumSym] === true;
}
__name(isPgEnum, "isPgEnum");
var _a18;
var PgEnumObjectColumnBuilder;
var _a19;
var PgEnumObjectColumn;
var isPgEnumSym;
var _a20;
var PgEnumColumnBuilder;
var _a21;
var PgEnumColumn;
var init_enum = __esm({
  "../node_modules/drizzle-orm/pg-core/columns/enum.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_common();
    PgEnumObjectColumnBuilder = /* @__PURE__ */ __name(class extends PgColumnBuilder {
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumObjectColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumObjectColumn(
          table,
          this.config
        );
      }
    }, "PgEnumObjectColumnBuilder");
    __name2(PgEnumObjectColumnBuilder, "PgEnumObjectColumnBuilder");
    _a18 = entityKind;
    __publicField(PgEnumObjectColumnBuilder, _a18, "PgEnumObjectColumnBuilder");
    PgEnumObjectColumn = /* @__PURE__ */ __name(class extends PgColumn {
      enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config) {
        super(table, config);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    }, "PgEnumObjectColumn");
    __name2(PgEnumObjectColumn, "PgEnumObjectColumn");
    _a19 = entityKind;
    __publicField(PgEnumObjectColumn, _a19, "PgEnumObjectColumn");
    isPgEnumSym = Symbol.for("drizzle:isPgEnum");
    __name2(isPgEnum, "isPgEnum");
    PgEnumColumnBuilder = /* @__PURE__ */ __name(class extends PgColumnBuilder {
      constructor(name, enumInstance) {
        super(name, "string", "PgEnumColumn");
        this.config.enum = enumInstance;
      }
      /** @internal */
      build(table) {
        return new PgEnumColumn(
          table,
          this.config
        );
      }
    }, "PgEnumColumnBuilder");
    __name2(PgEnumColumnBuilder, "PgEnumColumnBuilder");
    _a20 = entityKind;
    __publicField(PgEnumColumnBuilder, _a20, "PgEnumColumnBuilder");
    PgEnumColumn = /* @__PURE__ */ __name(class extends PgColumn {
      enum = this.config.enum;
      enumValues = this.config.enum.enumValues;
      constructor(table, config) {
        super(table, config);
        this.enum = config.enum;
      }
      getSQLType() {
        return this.enum.enumName;
      }
    }, "PgEnumColumn");
    __name2(PgEnumColumn, "PgEnumColumn");
    _a21 = entityKind;
    __publicField(PgEnumColumn, _a21, "PgEnumColumn");
  }
});
var _a22;
var Subquery;
var _a23;
var WithSubquery;
var init_subquery = __esm({
  "../node_modules/drizzle-orm/subquery.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    Subquery = /* @__PURE__ */ __name(class {
      constructor(sql2, fields, alias, isWith = false, usedTables = []) {
        this._ = {
          brand: "Subquery",
          sql: sql2,
          selectedFields: fields,
          alias,
          isWith,
          usedTables
        };
      }
      // getSQL(): SQL<unknown> {
      // 	return new SQL([this]);
      // }
    }, "Subquery");
    __name2(Subquery, "Subquery");
    _a22 = entityKind;
    __publicField(Subquery, _a22, "Subquery");
    WithSubquery = /* @__PURE__ */ __name(class extends Subquery {
    }, "WithSubquery");
    __name2(WithSubquery, "WithSubquery");
    _a23 = entityKind;
    __publicField(WithSubquery, _a23, "WithSubquery");
  }
});
var version;
var init_version = __esm({
  "../node_modules/drizzle-orm/version.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    version = "0.44.2";
  }
});
var otel;
var rawTracer;
var tracer;
var init_tracing = __esm({
  "../node_modules/drizzle-orm/tracing.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_tracing_utils();
    init_version();
    tracer = {
      startActiveSpan(name, fn) {
        if (!otel) {
          return fn();
        }
        if (!rawTracer) {
          rawTracer = otel.trace.getTracer("drizzle-orm", version);
        }
        return iife(
          (otel2, rawTracer2) => rawTracer2.startActiveSpan(
            name,
            (span) => {
              try {
                return fn(span);
              } catch (e) {
                span.setStatus({
                  code: otel2.SpanStatusCode.ERROR,
                  message: e instanceof Error ? e.message : "Unknown error"
                  // eslint-disable-line no-instanceof/no-instanceof
                });
                throw e;
              } finally {
                span.end();
              }
            }
          ),
          otel,
          rawTracer
        );
      }
    };
  }
});
var ViewBaseConfig;
var init_view_common = __esm({
  "../node_modules/drizzle-orm/view-common.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    ViewBaseConfig = Symbol.for("drizzle:ViewBaseConfig");
  }
});
function isSQLWrapper(value) {
  return value !== null && value !== void 0 && typeof value.getSQL === "function";
}
__name(isSQLWrapper, "isSQLWrapper");
function mergeQueries(queries) {
  const result = { sql: "", params: [] };
  for (const query of queries) {
    result.sql += query.sql;
    result.params.push(...query.params);
    if (query.typings?.length) {
      if (!result.typings) {
        result.typings = [];
      }
      result.typings.push(...query.typings);
    }
  }
  return result;
}
__name(mergeQueries, "mergeQueries");
function isDriverValueEncoder(value) {
  return typeof value === "object" && value !== null && "mapToDriverValue" in value && typeof value.mapToDriverValue === "function";
}
__name(isDriverValueEncoder, "isDriverValueEncoder");
function sql(strings, ...params) {
  const queryChunks = [];
  if (params.length > 0 || strings.length > 0 && strings[0] !== "") {
    queryChunks.push(new StringChunk(strings[0]));
  }
  for (const [paramIndex, param2] of params.entries()) {
    queryChunks.push(param2, new StringChunk(strings[paramIndex + 1]));
  }
  return new SQL(queryChunks);
}
__name(sql, "sql");
function fillPlaceholders(params, values) {
  return params.map((p) => {
    if (is(p, Placeholder)) {
      if (!(p.name in values)) {
        throw new Error(`No value for placeholder "${p.name}" was provided`);
      }
      return values[p.name];
    }
    if (is(p, Param) && is(p.value, Placeholder)) {
      if (!(p.value.name in values)) {
        throw new Error(`No value for placeholder "${p.value.name}" was provided`);
      }
      return p.encoder.mapToDriverValue(values[p.value.name]);
    }
    return p;
  });
}
__name(fillPlaceholders, "fillPlaceholders");
var _a24;
var FakePrimitiveParam;
var _a25;
var StringChunk;
var _a26;
var _SQL;
var SQL;
var _a27;
var Name;
var noopDecoder;
var noopEncoder;
var noopMapper;
var _a28;
var Param;
var _a29;
var Placeholder;
var IsDrizzleView;
var _a30;
var View;
var init_sql = __esm({
  "../node_modules/drizzle-orm/sql/sql.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_enum();
    init_subquery();
    init_tracing();
    init_view_common();
    init_column();
    init_table();
    FakePrimitiveParam = /* @__PURE__ */ __name(class {
    }, "FakePrimitiveParam");
    __name2(FakePrimitiveParam, "FakePrimitiveParam");
    _a24 = entityKind;
    __publicField(FakePrimitiveParam, _a24, "FakePrimitiveParam");
    __name2(isSQLWrapper, "isSQLWrapper");
    __name2(mergeQueries, "mergeQueries");
    StringChunk = /* @__PURE__ */ __name(class {
      value;
      constructor(value) {
        this.value = Array.isArray(value) ? value : [value];
      }
      getSQL() {
        return new SQL([this]);
      }
    }, "StringChunk");
    __name2(StringChunk, "StringChunk");
    _a25 = entityKind;
    __publicField(StringChunk, _a25, "StringChunk");
    _SQL = /* @__PURE__ */ __name(class {
      constructor(queryChunks) {
        this.queryChunks = queryChunks;
        for (const chunk of queryChunks) {
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            this.usedTables.push(
              schemaName === void 0 ? chunk[Table.Symbol.Name] : schemaName + "." + chunk[Table.Symbol.Name]
            );
          }
        }
      }
      /** @internal */
      decoder = noopDecoder;
      shouldInlineParams = false;
      /** @internal */
      usedTables = [];
      append(query) {
        this.queryChunks.push(...query.queryChunks);
        return this;
      }
      toQuery(config) {
        return tracer.startActiveSpan("drizzle.buildSQL", (span) => {
          const query = this.buildQueryFromSourceParams(this.queryChunks, config);
          span?.setAttributes({
            "drizzle.query.text": query.sql,
            "drizzle.query.params": JSON.stringify(query.params)
          });
          return query;
        });
      }
      buildQueryFromSourceParams(chunks, _config) {
        const config = Object.assign({}, _config, {
          inlineParams: _config.inlineParams || this.shouldInlineParams,
          paramStartIndex: _config.paramStartIndex || { value: 0 }
        });
        const {
          casing,
          escapeName,
          escapeParam,
          prepareTyping,
          inlineParams,
          paramStartIndex
        } = config;
        return mergeQueries(chunks.map((chunk) => {
          if (is(chunk, StringChunk)) {
            return { sql: chunk.value.join(""), params: [] };
          }
          if (is(chunk, Name)) {
            return { sql: escapeName(chunk.value), params: [] };
          }
          if (chunk === void 0) {
            return { sql: "", params: [] };
          }
          if (Array.isArray(chunk)) {
            const result = [new StringChunk("(")];
            for (const [i, p] of chunk.entries()) {
              result.push(p);
              if (i < chunk.length - 1) {
                result.push(new StringChunk(", "));
              }
            }
            result.push(new StringChunk(")"));
            return this.buildQueryFromSourceParams(result, config);
          }
          if (is(chunk, _SQL)) {
            return this.buildQueryFromSourceParams(chunk.queryChunks, {
              ...config,
              inlineParams: inlineParams || chunk.shouldInlineParams
            });
          }
          if (is(chunk, Table)) {
            const schemaName = chunk[Table.Symbol.Schema];
            const tableName = chunk[Table.Symbol.Name];
            return {
              sql: schemaName === void 0 || chunk[IsAlias] ? escapeName(tableName) : escapeName(schemaName) + "." + escapeName(tableName),
              params: []
            };
          }
          if (is(chunk, Column)) {
            const columnName = casing.getColumnCasing(chunk);
            if (_config.invokeSource === "indexes") {
              return { sql: escapeName(columnName), params: [] };
            }
            const schemaName = chunk.table[Table.Symbol.Schema];
            return {
              sql: chunk.table[IsAlias] || schemaName === void 0 ? escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName) : escapeName(schemaName) + "." + escapeName(chunk.table[Table.Symbol.Name]) + "." + escapeName(columnName),
              params: []
            };
          }
          if (is(chunk, View)) {
            const schemaName = chunk[ViewBaseConfig].schema;
            const viewName = chunk[ViewBaseConfig].name;
            return {
              sql: schemaName === void 0 || chunk[ViewBaseConfig].isAlias ? escapeName(viewName) : escapeName(schemaName) + "." + escapeName(viewName),
              params: []
            };
          }
          if (is(chunk, Param)) {
            if (is(chunk.value, Placeholder)) {
              return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
            }
            const mappedValue = chunk.value === null ? null : chunk.encoder.mapToDriverValue(chunk.value);
            if (is(mappedValue, _SQL)) {
              return this.buildQueryFromSourceParams([mappedValue], config);
            }
            if (inlineParams) {
              return { sql: this.mapInlineParam(mappedValue, config), params: [] };
            }
            let typings = ["none"];
            if (prepareTyping) {
              typings = [prepareTyping(chunk.encoder)];
            }
            return { sql: escapeParam(paramStartIndex.value++, mappedValue), params: [mappedValue], typings };
          }
          if (is(chunk, Placeholder)) {
            return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
          }
          if (is(chunk, _SQL.Aliased) && chunk.fieldAlias !== void 0) {
            return { sql: escapeName(chunk.fieldAlias), params: [] };
          }
          if (is(chunk, Subquery)) {
            if (chunk._.isWith) {
              return { sql: escapeName(chunk._.alias), params: [] };
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk._.sql,
              new StringChunk(") "),
              new Name(chunk._.alias)
            ], config);
          }
          if (isPgEnum(chunk)) {
            if (chunk.schema) {
              return { sql: escapeName(chunk.schema) + "." + escapeName(chunk.enumName), params: [] };
            }
            return { sql: escapeName(chunk.enumName), params: [] };
          }
          if (isSQLWrapper(chunk)) {
            if (chunk.shouldOmitSQLParens?.()) {
              return this.buildQueryFromSourceParams([chunk.getSQL()], config);
            }
            return this.buildQueryFromSourceParams([
              new StringChunk("("),
              chunk.getSQL(),
              new StringChunk(")")
            ], config);
          }
          if (inlineParams) {
            return { sql: this.mapInlineParam(chunk, config), params: [] };
          }
          return { sql: escapeParam(paramStartIndex.value++, chunk), params: [chunk], typings: ["none"] };
        }));
      }
      mapInlineParam(chunk, { escapeString: escapeString2 }) {
        if (chunk === null) {
          return "null";
        }
        if (typeof chunk === "number" || typeof chunk === "boolean") {
          return chunk.toString();
        }
        if (typeof chunk === "string") {
          return escapeString2(chunk);
        }
        if (typeof chunk === "object") {
          const mappedValueAsString = chunk.toString();
          if (mappedValueAsString === "[object Object]") {
            return escapeString2(JSON.stringify(chunk));
          }
          return escapeString2(mappedValueAsString);
        }
        throw new Error("Unexpected param value: " + chunk);
      }
      getSQL() {
        return this;
      }
      as(alias) {
        if (alias === void 0) {
          return this;
        }
        return new _SQL.Aliased(this, alias);
      }
      mapWith(decoder) {
        this.decoder = typeof decoder === "function" ? { mapFromDriverValue: decoder } : decoder;
        return this;
      }
      inlineParams() {
        this.shouldInlineParams = true;
        return this;
      }
      /**
       * This method is used to conditionally include a part of the query.
       *
       * @param condition - Condition to check
       * @returns itself if the condition is `true`, otherwise `undefined`
       */
      if(condition) {
        return condition ? this : void 0;
      }
    }, "_SQL");
    SQL = _SQL;
    __name2(SQL, "SQL");
    _a26 = entityKind;
    __publicField(SQL, _a26, "SQL");
    Name = /* @__PURE__ */ __name(class {
      constructor(value) {
        this.value = value;
      }
      brand;
      getSQL() {
        return new SQL([this]);
      }
    }, "Name");
    __name2(Name, "Name");
    _a27 = entityKind;
    __publicField(Name, _a27, "Name");
    __name2(isDriverValueEncoder, "isDriverValueEncoder");
    noopDecoder = {
      mapFromDriverValue: (value) => value
    };
    noopEncoder = {
      mapToDriverValue: (value) => value
    };
    noopMapper = {
      ...noopDecoder,
      ...noopEncoder
    };
    Param = /* @__PURE__ */ __name(class {
      /**
       * @param value - Parameter value
       * @param encoder - Encoder to convert the value to a driver parameter
       */
      constructor(value, encoder = noopEncoder) {
        this.value = value;
        this.encoder = encoder;
      }
      brand;
      getSQL() {
        return new SQL([this]);
      }
    }, "Param");
    __name2(Param, "Param");
    _a28 = entityKind;
    __publicField(Param, _a28, "Param");
    __name2(sql, "sql");
    ((sql2) => {
      function empty() {
        return new SQL([]);
      }
      __name(empty, "empty");
      __name2(empty, "empty");
      sql2.empty = empty;
      function fromList(list) {
        return new SQL(list);
      }
      __name(fromList, "fromList");
      __name2(fromList, "fromList");
      sql2.fromList = fromList;
      function raw(str) {
        return new SQL([new StringChunk(str)]);
      }
      __name(raw, "raw");
      __name2(raw, "raw");
      sql2.raw = raw;
      function join(chunks, separator) {
        const result = [];
        for (const [i, chunk] of chunks.entries()) {
          if (i > 0 && separator !== void 0) {
            result.push(separator);
          }
          result.push(chunk);
        }
        return new SQL(result);
      }
      __name(join, "join");
      __name2(join, "join");
      sql2.join = join;
      function identifier(value) {
        return new Name(value);
      }
      __name(identifier, "identifier");
      __name2(identifier, "identifier");
      sql2.identifier = identifier;
      function placeholder2(name2) {
        return new Placeholder(name2);
      }
      __name(placeholder2, "placeholder2");
      __name2(placeholder2, "placeholder2");
      sql2.placeholder = placeholder2;
      function param2(value, encoder) {
        return new Param(value, encoder);
      }
      __name(param2, "param2");
      __name2(param2, "param2");
      sql2.param = param2;
    })(sql || (sql = {}));
    ((SQL2) => {
      class Aliased {
        constructor(sql2, fieldAlias) {
          this.sql = sql2;
          this.fieldAlias = fieldAlias;
        }
        static [entityKind] = "SQL.Aliased";
        /** @internal */
        isSelectionField = false;
        getSQL() {
          return this.sql;
        }
        /** @internal */
        clone() {
          return new Aliased(this.sql, this.fieldAlias);
        }
      }
      __name(Aliased, "Aliased");
      __name2(Aliased, "Aliased");
      SQL2.Aliased = Aliased;
    })(SQL || (SQL = {}));
    Placeholder = /* @__PURE__ */ __name(class {
      constructor(name2) {
        this.name = name2;
      }
      getSQL() {
        return new SQL([this]);
      }
    }, "Placeholder");
    __name2(Placeholder, "Placeholder");
    _a29 = entityKind;
    __publicField(Placeholder, _a29, "Placeholder");
    __name2(fillPlaceholders, "fillPlaceholders");
    IsDrizzleView = Symbol.for("drizzle:IsDrizzleView");
    View = /* @__PURE__ */ __name(class {
      /** @internal */
      [(_a30 = entityKind, ViewBaseConfig)];
      /** @internal */
      [IsDrizzleView] = true;
      constructor({ name: name2, schema, selectedFields, query }) {
        this[ViewBaseConfig] = {
          name: name2,
          originalName: name2,
          schema,
          selectedFields,
          query,
          isExisting: !query,
          isAlias: false
        };
      }
      getSQL() {
        return new SQL([this]);
      }
    }, "View");
    __name2(View, "View");
    __publicField(View, _a30, "View");
    Column.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Table.prototype.getSQL = function() {
      return new SQL([this]);
    };
    Subquery.prototype.getSQL = function() {
      return new SQL([this]);
    };
  }
});
function mapResultRow(columns, row, joinsNotNullableMap) {
  const nullifyMap = {};
  const result = columns.reduce(
    (result2, { path, field }, columnIndex) => {
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      let node = result2;
      for (const [pathChunkIndex, pathChunk] of path.entries()) {
        if (pathChunkIndex < path.length - 1) {
          if (!(pathChunk in node)) {
            node[pathChunk] = {};
          }
          node = node[pathChunk];
        } else {
          const rawValue = row[columnIndex];
          const value = node[pathChunk] = rawValue === null ? null : decoder.mapFromDriverValue(rawValue);
          if (joinsNotNullableMap && is(field, Column) && path.length === 2) {
            const objectName = path[0];
            if (!(objectName in nullifyMap)) {
              nullifyMap[objectName] = value === null ? getTableName(field.table) : false;
            } else if (typeof nullifyMap[objectName] === "string" && nullifyMap[objectName] !== getTableName(field.table)) {
              nullifyMap[objectName] = false;
            }
          }
        }
      }
      return result2;
    },
    {}
  );
  if (joinsNotNullableMap && Object.keys(nullifyMap).length > 0) {
    for (const [objectName, tableName] of Object.entries(nullifyMap)) {
      if (typeof tableName === "string" && !joinsNotNullableMap[tableName]) {
        result[objectName] = null;
      }
    }
  }
  return result;
}
__name(mapResultRow, "mapResultRow");
function orderSelectedFields(fields, pathPrefix) {
  return Object.entries(fields).reduce((result, [name, field]) => {
    if (typeof name !== "string") {
      return result;
    }
    const newPath = pathPrefix ? [...pathPrefix, name] : [name];
    if (is(field, Column) || is(field, SQL) || is(field, SQL.Aliased)) {
      result.push({ path: newPath, field });
    } else if (is(field, Table)) {
      result.push(...orderSelectedFields(field[Table.Symbol.Columns], newPath));
    } else {
      result.push(...orderSelectedFields(field, newPath));
    }
    return result;
  }, []);
}
__name(orderSelectedFields, "orderSelectedFields");
function haveSameKeys(left, right) {
  const leftKeys = Object.keys(left);
  const rightKeys = Object.keys(right);
  if (leftKeys.length !== rightKeys.length) {
    return false;
  }
  for (const [index, key] of leftKeys.entries()) {
    if (key !== rightKeys[index]) {
      return false;
    }
  }
  return true;
}
__name(haveSameKeys, "haveSameKeys");
function mapUpdateSet(table, values) {
  const entries = Object.entries(values).filter(([, value]) => value !== void 0).map(([key, value]) => {
    if (is(value, SQL) || is(value, Column)) {
      return [key, value];
    } else {
      return [key, new Param(value, table[Table.Symbol.Columns][key])];
    }
  });
  if (entries.length === 0) {
    throw new Error("No values to set");
  }
  return Object.fromEntries(entries);
}
__name(mapUpdateSet, "mapUpdateSet");
function applyMixins(baseClass, extendedClasses) {
  for (const extendedClass of extendedClasses) {
    for (const name of Object.getOwnPropertyNames(extendedClass.prototype)) {
      if (name === "constructor")
        continue;
      Object.defineProperty(
        baseClass.prototype,
        name,
        Object.getOwnPropertyDescriptor(extendedClass.prototype, name) || /* @__PURE__ */ Object.create(null)
      );
    }
  }
}
__name(applyMixins, "applyMixins");
function getTableColumns(table) {
  return table[Table.Symbol.Columns];
}
__name(getTableColumns, "getTableColumns");
function getTableLikeName(table) {
  return is(table, Subquery) ? table._.alias : is(table, View) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : table[Table.Symbol.IsAlias] ? table[Table.Symbol.Name] : table[Table.Symbol.BaseName];
}
__name(getTableLikeName, "getTableLikeName");
function getColumnNameAndConfig(a, b) {
  return {
    name: typeof a === "string" && a.length > 0 ? a : "",
    config: typeof a === "object" ? a : b
  };
}
__name(getColumnNameAndConfig, "getColumnNameAndConfig");
var init_utils = __esm({
  "../node_modules/drizzle-orm/utils.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_table();
    init_view_common();
    __name2(mapResultRow, "mapResultRow");
    __name2(orderSelectedFields, "orderSelectedFields");
    __name2(haveSameKeys, "haveSameKeys");
    __name2(mapUpdateSet, "mapUpdateSet");
    __name2(applyMixins, "applyMixins");
    __name2(getTableColumns, "getTableColumns");
    __name2(getTableLikeName, "getTableLikeName");
    __name2(getColumnNameAndConfig, "getColumnNameAndConfig");
  }
});
var InlineForeignKeys;
var EnableRLS;
var _a31;
var PgTable;
var init_table2 = __esm({
  "../node_modules/drizzle-orm/pg-core/table.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table();
    InlineForeignKeys = Symbol.for("drizzle:PgInlineForeignKeys");
    EnableRLS = Symbol.for("drizzle:EnableRLS");
    PgTable = /* @__PURE__ */ __name(class extends Table {
      /**@internal */
      [(_a31 = entityKind, InlineForeignKeys)] = [];
      /** @internal */
      [EnableRLS] = false;
      /** @internal */
      [Table.Symbol.ExtraConfigBuilder] = void 0;
      /** @internal */
      [Table.Symbol.ExtraConfigColumns] = {};
    }, "PgTable");
    __name2(PgTable, "PgTable");
    __publicField(PgTable, _a31, "PgTable");
    __publicField(PgTable, "Symbol", Object.assign({}, Table.Symbol, {
      InlineForeignKeys,
      EnableRLS
    }));
  }
});
var _a32;
var PrimaryKeyBuilder;
var _a33;
var PrimaryKey;
var init_primary_keys = __esm({
  "../node_modules/drizzle-orm/pg-core/primary-keys.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table2();
    PrimaryKeyBuilder = /* @__PURE__ */ __name(class {
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey(table, this.columns, this.name);
      }
    }, "PrimaryKeyBuilder");
    __name2(PrimaryKeyBuilder, "PrimaryKeyBuilder");
    _a32 = entityKind;
    __publicField(PrimaryKeyBuilder, _a32, "PgPrimaryKeyBuilder");
    PrimaryKey = /* @__PURE__ */ __name(class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[PgTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    }, "PrimaryKey");
    __name2(PrimaryKey, "PrimaryKey");
    _a33 = entityKind;
    __publicField(PrimaryKey, _a33, "PgPrimaryKey");
  }
});
function bindIfParam(value, column) {
  if (isDriverValueEncoder(column) && !isSQLWrapper(value) && !is(value, Param) && !is(value, Placeholder) && !is(value, Column) && !is(value, Table) && !is(value, View)) {
    return new Param(value, column);
  }
  return value;
}
__name(bindIfParam, "bindIfParam");
function and(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" and ")),
    new StringChunk(")")
  ]);
}
__name(and, "and");
function or(...unfilteredConditions) {
  const conditions = unfilteredConditions.filter(
    (c) => c !== void 0
  );
  if (conditions.length === 0) {
    return void 0;
  }
  if (conditions.length === 1) {
    return new SQL(conditions);
  }
  return new SQL([
    new StringChunk("("),
    sql.join(conditions, new StringChunk(" or ")),
    new StringChunk(")")
  ]);
}
__name(or, "or");
function not(condition) {
  return sql`not ${condition}`;
}
__name(not, "not");
function inArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`false`;
    }
    return sql`${column} in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} in ${bindIfParam(values, column)}`;
}
__name(inArray, "inArray");
function notInArray(column, values) {
  if (Array.isArray(values)) {
    if (values.length === 0) {
      return sql`true`;
    }
    return sql`${column} not in ${values.map((v) => bindIfParam(v, column))}`;
  }
  return sql`${column} not in ${bindIfParam(values, column)}`;
}
__name(notInArray, "notInArray");
function isNull(value) {
  return sql`${value} is null`;
}
__name(isNull, "isNull");
function isNotNull(value) {
  return sql`${value} is not null`;
}
__name(isNotNull, "isNotNull");
function exists(subquery) {
  return sql`exists ${subquery}`;
}
__name(exists, "exists");
function notExists(subquery) {
  return sql`not exists ${subquery}`;
}
__name(notExists, "notExists");
function between(column, min, max) {
  return sql`${column} between ${bindIfParam(min, column)} and ${bindIfParam(
    max,
    column
  )}`;
}
__name(between, "between");
function notBetween(column, min, max) {
  return sql`${column} not between ${bindIfParam(
    min,
    column
  )} and ${bindIfParam(max, column)}`;
}
__name(notBetween, "notBetween");
function like(column, value) {
  return sql`${column} like ${value}`;
}
__name(like, "like");
function notLike(column, value) {
  return sql`${column} not like ${value}`;
}
__name(notLike, "notLike");
function ilike(column, value) {
  return sql`${column} ilike ${value}`;
}
__name(ilike, "ilike");
function notIlike(column, value) {
  return sql`${column} not ilike ${value}`;
}
__name(notIlike, "notIlike");
var eq;
var ne;
var gt;
var gte;
var lt;
var lte;
var init_conditions = __esm({
  "../node_modules/drizzle-orm/sql/expressions/conditions.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_column();
    init_entity();
    init_table();
    init_sql();
    __name2(bindIfParam, "bindIfParam");
    eq = /* @__PURE__ */ __name2((left, right) => {
      return sql`${left} = ${bindIfParam(right, left)}`;
    }, "eq");
    ne = /* @__PURE__ */ __name2((left, right) => {
      return sql`${left} <> ${bindIfParam(right, left)}`;
    }, "ne");
    __name2(and, "and");
    __name2(or, "or");
    __name2(not, "not");
    gt = /* @__PURE__ */ __name2((left, right) => {
      return sql`${left} > ${bindIfParam(right, left)}`;
    }, "gt");
    gte = /* @__PURE__ */ __name2((left, right) => {
      return sql`${left} >= ${bindIfParam(right, left)}`;
    }, "gte");
    lt = /* @__PURE__ */ __name2((left, right) => {
      return sql`${left} < ${bindIfParam(right, left)}`;
    }, "lt");
    lte = /* @__PURE__ */ __name2((left, right) => {
      return sql`${left} <= ${bindIfParam(right, left)}`;
    }, "lte");
    __name2(inArray, "inArray");
    __name2(notInArray, "notInArray");
    __name2(isNull, "isNull");
    __name2(isNotNull, "isNotNull");
    __name2(exists, "exists");
    __name2(notExists, "notExists");
    __name2(between, "between");
    __name2(notBetween, "notBetween");
    __name2(like, "like");
    __name2(notLike, "notLike");
    __name2(ilike, "ilike");
    __name2(notIlike, "notIlike");
  }
});
function asc(column) {
  return sql`${column} asc`;
}
__name(asc, "asc");
function desc(column) {
  return sql`${column} desc`;
}
__name(desc, "desc");
var init_select = __esm({
  "../node_modules/drizzle-orm/sql/expressions/select.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_sql();
    __name2(asc, "asc");
    __name2(desc, "desc");
  }
});
var init_expressions = __esm({
  "../node_modules/drizzle-orm/sql/expressions/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_conditions();
    init_select();
  }
});
function getOperators() {
  return {
    and,
    between,
    eq,
    exists,
    gt,
    gte,
    ilike,
    inArray,
    isNull,
    isNotNull,
    like,
    lt,
    lte,
    ne,
    not,
    notBetween,
    notExists,
    notLike,
    notIlike,
    notInArray,
    or,
    sql
  };
}
__name(getOperators, "getOperators");
function getOrderByOperators() {
  return {
    sql,
    asc,
    desc
  };
}
__name(getOrderByOperators, "getOrderByOperators");
function extractTablesRelationalConfig(schema, configHelpers) {
  if (Object.keys(schema).length === 1 && "default" in schema && !is(schema["default"], Table)) {
    schema = schema["default"];
  }
  const tableNamesMap = {};
  const relationsBuffer = {};
  const tablesConfig = {};
  for (const [key, value] of Object.entries(schema)) {
    if (is(value, Table)) {
      const dbName = getTableUniqueName(value);
      const bufferedRelations = relationsBuffer[dbName];
      tableNamesMap[dbName] = key;
      tablesConfig[key] = {
        tsName: key,
        dbName: value[Table.Symbol.Name],
        schema: value[Table.Symbol.Schema],
        columns: value[Table.Symbol.Columns],
        relations: bufferedRelations?.relations ?? {},
        primaryKey: bufferedRelations?.primaryKey ?? []
      };
      for (const column of Object.values(
        value[Table.Symbol.Columns]
      )) {
        if (column.primary) {
          tablesConfig[key].primaryKey.push(column);
        }
      }
      const extraConfig = value[Table.Symbol.ExtraConfigBuilder]?.(value[Table.Symbol.ExtraConfigColumns]);
      if (extraConfig) {
        for (const configEntry of Object.values(extraConfig)) {
          if (is(configEntry, PrimaryKeyBuilder)) {
            tablesConfig[key].primaryKey.push(...configEntry.columns);
          }
        }
      }
    } else if (is(value, Relations)) {
      const dbName = getTableUniqueName(value.table);
      const tableName = tableNamesMap[dbName];
      const relations2 = value.config(
        configHelpers(value.table)
      );
      let primaryKey;
      for (const [relationName, relation] of Object.entries(relations2)) {
        if (tableName) {
          const tableConfig = tablesConfig[tableName];
          tableConfig.relations[relationName] = relation;
          if (primaryKey) {
            tableConfig.primaryKey.push(...primaryKey);
          }
        } else {
          if (!(dbName in relationsBuffer)) {
            relationsBuffer[dbName] = {
              relations: {},
              primaryKey
            };
          }
          relationsBuffer[dbName].relations[relationName] = relation;
        }
      }
    }
  }
  return { tables: tablesConfig, tableNamesMap };
}
__name(extractTablesRelationalConfig, "extractTablesRelationalConfig");
function createOne(sourceTable) {
  return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function one(table, config) {
    return new One(
      sourceTable,
      table,
      config,
      config?.fields.reduce((res, f) => res && f.notNull, true) ?? false
    );
  }, "one"), "one");
}
__name(createOne, "createOne");
function createMany(sourceTable) {
  return /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function many(referencedTable, config) {
    return new Many(sourceTable, referencedTable, config);
  }, "many"), "many");
}
__name(createMany, "createMany");
function normalizeRelation(schema, tableNamesMap, relation) {
  if (is(relation, One) && relation.config) {
    return {
      fields: relation.config.fields,
      references: relation.config.references
    };
  }
  const referencedTableTsName = tableNamesMap[getTableUniqueName(relation.referencedTable)];
  if (!referencedTableTsName) {
    throw new Error(
      `Table "${relation.referencedTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const referencedTableConfig = schema[referencedTableTsName];
  if (!referencedTableConfig) {
    throw new Error(`Table "${referencedTableTsName}" not found in schema`);
  }
  const sourceTable = relation.sourceTable;
  const sourceTableTsName = tableNamesMap[getTableUniqueName(sourceTable)];
  if (!sourceTableTsName) {
    throw new Error(
      `Table "${sourceTable[Table.Symbol.Name]}" not found in schema`
    );
  }
  const reverseRelations = [];
  for (const referencedTableRelation of Object.values(
    referencedTableConfig.relations
  )) {
    if (relation.relationName && relation !== referencedTableRelation && referencedTableRelation.relationName === relation.relationName || !relation.relationName && referencedTableRelation.referencedTable === relation.sourceTable) {
      reverseRelations.push(referencedTableRelation);
    }
  }
  if (reverseRelations.length > 1) {
    throw relation.relationName ? new Error(
      `There are multiple relations with name "${relation.relationName}" in table "${referencedTableTsName}"`
    ) : new Error(
      `There are multiple relations between "${referencedTableTsName}" and "${relation.sourceTable[Table.Symbol.Name]}". Please specify relation name`
    );
  }
  if (reverseRelations[0] && is(reverseRelations[0], One) && reverseRelations[0].config) {
    return {
      fields: reverseRelations[0].config.references,
      references: reverseRelations[0].config.fields
    };
  }
  throw new Error(
    `There is not enough information to infer relation "${sourceTableTsName}.${relation.fieldName}"`
  );
}
__name(normalizeRelation, "normalizeRelation");
function createTableRelationsHelpers(sourceTable) {
  return {
    one: createOne(sourceTable),
    many: createMany(sourceTable)
  };
}
__name(createTableRelationsHelpers, "createTableRelationsHelpers");
function mapRelationalRow(tablesConfig, tableConfig, row, buildQueryResultSelection, mapColumnValue = (value) => value) {
  const result = {};
  for (const [
    selectionItemIndex,
    selectionItem
  ] of buildQueryResultSelection.entries()) {
    if (selectionItem.isJson) {
      const relation = tableConfig.relations[selectionItem.tsKey];
      const rawSubRows = row[selectionItemIndex];
      const subRows = typeof rawSubRows === "string" ? JSON.parse(rawSubRows) : rawSubRows;
      result[selectionItem.tsKey] = is(relation, One) ? subRows && mapRelationalRow(
        tablesConfig,
        tablesConfig[selectionItem.relationTableTsKey],
        subRows,
        selectionItem.selection,
        mapColumnValue
      ) : subRows.map(
        (subRow) => mapRelationalRow(
          tablesConfig,
          tablesConfig[selectionItem.relationTableTsKey],
          subRow,
          selectionItem.selection,
          mapColumnValue
        )
      );
    } else {
      const value = mapColumnValue(row[selectionItemIndex]);
      const field = selectionItem.field;
      let decoder;
      if (is(field, Column)) {
        decoder = field;
      } else if (is(field, SQL)) {
        decoder = field.decoder;
      } else {
        decoder = field.sql.decoder;
      }
      result[selectionItem.tsKey] = value === null ? null : decoder.mapFromDriverValue(value);
    }
  }
  return result;
}
__name(mapRelationalRow, "mapRelationalRow");
var _a34;
var Relation;
var _a35;
var Relations;
var _a36;
var _One;
var One;
var _a37;
var _Many;
var Many;
var init_relations = __esm({
  "../node_modules/drizzle-orm/relations.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_table();
    init_column();
    init_entity();
    init_primary_keys();
    init_expressions();
    init_sql();
    Relation = /* @__PURE__ */ __name(class {
      constructor(sourceTable, referencedTable, relationName) {
        this.sourceTable = sourceTable;
        this.referencedTable = referencedTable;
        this.relationName = relationName;
        this.referencedTableName = referencedTable[Table.Symbol.Name];
      }
      referencedTableName;
      fieldName;
    }, "Relation");
    __name2(Relation, "Relation");
    _a34 = entityKind;
    __publicField(Relation, _a34, "Relation");
    Relations = /* @__PURE__ */ __name(class {
      constructor(table, config) {
        this.table = table;
        this.config = config;
      }
    }, "Relations");
    __name2(Relations, "Relations");
    _a35 = entityKind;
    __publicField(Relations, _a35, "Relations");
    _One = /* @__PURE__ */ __name(class extends Relation {
      constructor(sourceTable, referencedTable, config, isNullable) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
        this.isNullable = isNullable;
      }
      withFieldName(fieldName) {
        const relation = new _One(
          this.sourceTable,
          this.referencedTable,
          this.config,
          this.isNullable
        );
        relation.fieldName = fieldName;
        return relation;
      }
    }, "_One");
    One = _One;
    __name2(One, "One");
    _a36 = entityKind;
    __publicField(One, _a36, "One");
    _Many = /* @__PURE__ */ __name(class extends Relation {
      constructor(sourceTable, referencedTable, config) {
        super(sourceTable, referencedTable, config?.relationName);
        this.config = config;
      }
      withFieldName(fieldName) {
        const relation = new _Many(
          this.sourceTable,
          this.referencedTable,
          this.config
        );
        relation.fieldName = fieldName;
        return relation;
      }
    }, "_Many");
    Many = _Many;
    __name2(Many, "Many");
    _a37 = entityKind;
    __publicField(Many, _a37, "Many");
    __name2(getOperators, "getOperators");
    __name2(getOrderByOperators, "getOrderByOperators");
    __name2(extractTablesRelationalConfig, "extractTablesRelationalConfig");
    __name2(createOne, "createOne");
    __name2(createMany, "createMany");
    __name2(normalizeRelation, "normalizeRelation");
    __name2(createTableRelationsHelpers, "createTableRelationsHelpers");
    __name2(mapRelationalRow, "mapRelationalRow");
  }
});
function aliasedTable(table, tableAlias) {
  return new Proxy(table, new TableAliasProxyHandler(tableAlias, false));
}
__name(aliasedTable, "aliasedTable");
function aliasedTableColumn(column, tableAlias) {
  return new Proxy(
    column,
    new ColumnAliasProxyHandler(new Proxy(column.table, new TableAliasProxyHandler(tableAlias, false)))
  );
}
__name(aliasedTableColumn, "aliasedTableColumn");
function mapColumnsInAliasedSQLToAlias(query, alias) {
  return new SQL.Aliased(mapColumnsInSQLToAlias(query.sql, alias), query.fieldAlias);
}
__name(mapColumnsInAliasedSQLToAlias, "mapColumnsInAliasedSQLToAlias");
function mapColumnsInSQLToAlias(query, alias) {
  return sql.join(query.queryChunks.map((c) => {
    if (is(c, Column)) {
      return aliasedTableColumn(c, alias);
    }
    if (is(c, SQL)) {
      return mapColumnsInSQLToAlias(c, alias);
    }
    if (is(c, SQL.Aliased)) {
      return mapColumnsInAliasedSQLToAlias(c, alias);
    }
    return c;
  }));
}
__name(mapColumnsInSQLToAlias, "mapColumnsInSQLToAlias");
var _a38;
var ColumnAliasProxyHandler;
var _a39;
var TableAliasProxyHandler;
var _a40;
var RelationTableAliasProxyHandler;
var init_alias = __esm({
  "../node_modules/drizzle-orm/alias.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_column();
    init_entity();
    init_sql();
    init_table();
    init_view_common();
    ColumnAliasProxyHandler = /* @__PURE__ */ __name(class {
      constructor(table) {
        this.table = table;
      }
      get(columnObj, prop) {
        if (prop === "table") {
          return this.table;
        }
        return columnObj[prop];
      }
    }, "ColumnAliasProxyHandler");
    __name2(ColumnAliasProxyHandler, "ColumnAliasProxyHandler");
    _a38 = entityKind;
    __publicField(ColumnAliasProxyHandler, _a38, "ColumnAliasProxyHandler");
    TableAliasProxyHandler = /* @__PURE__ */ __name(class {
      constructor(alias, replaceOriginalName) {
        this.alias = alias;
        this.replaceOriginalName = replaceOriginalName;
      }
      get(target, prop) {
        if (prop === Table.Symbol.IsAlias) {
          return true;
        }
        if (prop === Table.Symbol.Name) {
          return this.alias;
        }
        if (this.replaceOriginalName && prop === Table.Symbol.OriginalName) {
          return this.alias;
        }
        if (prop === ViewBaseConfig) {
          return {
            ...target[ViewBaseConfig],
            name: this.alias,
            isAlias: true
          };
        }
        if (prop === Table.Symbol.Columns) {
          const columns = target[Table.Symbol.Columns];
          if (!columns) {
            return columns;
          }
          const proxiedColumns = {};
          Object.keys(columns).map((key) => {
            proxiedColumns[key] = new Proxy(
              columns[key],
              new ColumnAliasProxyHandler(new Proxy(target, this))
            );
          });
          return proxiedColumns;
        }
        const value = target[prop];
        if (is(value, Column)) {
          return new Proxy(value, new ColumnAliasProxyHandler(new Proxy(target, this)));
        }
        return value;
      }
    }, "TableAliasProxyHandler");
    __name2(TableAliasProxyHandler, "TableAliasProxyHandler");
    _a39 = entityKind;
    __publicField(TableAliasProxyHandler, _a39, "TableAliasProxyHandler");
    RelationTableAliasProxyHandler = /* @__PURE__ */ __name(class {
      constructor(alias) {
        this.alias = alias;
      }
      get(target, prop) {
        if (prop === "sourceTable") {
          return aliasedTable(target.sourceTable, this.alias);
        }
        return target[prop];
      }
    }, "RelationTableAliasProxyHandler");
    __name2(RelationTableAliasProxyHandler, "RelationTableAliasProxyHandler");
    _a40 = entityKind;
    __publicField(RelationTableAliasProxyHandler, _a40, "RelationTableAliasProxyHandler");
    __name2(aliasedTable, "aliasedTable");
    __name2(aliasedTableColumn, "aliasedTableColumn");
    __name2(mapColumnsInAliasedSQLToAlias, "mapColumnsInAliasedSQLToAlias");
    __name2(mapColumnsInSQLToAlias, "mapColumnsInSQLToAlias");
  }
});
var _a41;
var _SelectionProxyHandler;
var SelectionProxyHandler;
var init_selection_proxy = __esm({
  "../node_modules/drizzle-orm/selection-proxy.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_alias();
    init_column();
    init_entity();
    init_sql();
    init_subquery();
    init_view_common();
    _SelectionProxyHandler = /* @__PURE__ */ __name(class {
      config;
      constructor(config) {
        this.config = { ...config };
      }
      get(subquery, prop) {
        if (prop === "_") {
          return {
            ...subquery["_"],
            selectedFields: new Proxy(
              subquery._.selectedFields,
              this
            )
          };
        }
        if (prop === ViewBaseConfig) {
          return {
            ...subquery[ViewBaseConfig],
            selectedFields: new Proxy(
              subquery[ViewBaseConfig].selectedFields,
              this
            )
          };
        }
        if (typeof prop === "symbol") {
          return subquery[prop];
        }
        const columns = is(subquery, Subquery) ? subquery._.selectedFields : is(subquery, View) ? subquery[ViewBaseConfig].selectedFields : subquery;
        const value = columns[prop];
        if (is(value, SQL.Aliased)) {
          if (this.config.sqlAliasedBehavior === "sql" && !value.isSelectionField) {
            return value.sql;
          }
          const newValue = value.clone();
          newValue.isSelectionField = true;
          return newValue;
        }
        if (is(value, SQL)) {
          if (this.config.sqlBehavior === "sql") {
            return value;
          }
          throw new Error(
            `You tried to reference "${prop}" field from a subquery, which is a raw SQL field, but it doesn't have an alias declared. Please add an alias to the field using ".as('alias')" method.`
          );
        }
        if (is(value, Column)) {
          if (this.config.alias) {
            return new Proxy(
              value,
              new ColumnAliasProxyHandler(
                new Proxy(
                  value.table,
                  new TableAliasProxyHandler(this.config.alias, this.config.replaceOriginalName ?? false)
                )
              )
            );
          }
          return value;
        }
        if (typeof value !== "object" || value === null) {
          return value;
        }
        return new Proxy(value, new _SelectionProxyHandler(this.config));
      }
    }, "_SelectionProxyHandler");
    SelectionProxyHandler = _SelectionProxyHandler;
    __name2(SelectionProxyHandler, "SelectionProxyHandler");
    _a41 = entityKind;
    __publicField(SelectionProxyHandler, _a41, "SelectionProxyHandler");
  }
});
var _a42;
var QueryPromise;
var init_query_promise = __esm({
  "../node_modules/drizzle-orm/query-promise.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    QueryPromise = /* @__PURE__ */ __name(class {
      [(_a42 = entityKind, Symbol.toStringTag)] = "QueryPromise";
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
      then(onFulfilled, onRejected) {
        return this.execute().then(onFulfilled, onRejected);
      }
    }, "QueryPromise");
    __name2(QueryPromise, "QueryPromise");
    __publicField(QueryPromise, _a42, "QueryPromise");
  }
});
var _a43;
var ForeignKeyBuilder2;
var _a44;
var ForeignKey2;
var init_foreign_keys2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/foreign-keys.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table_utils();
    ForeignKeyBuilder2 = /* @__PURE__ */ __name(class {
      /** @internal */
      reference;
      /** @internal */
      _onUpdate;
      /** @internal */
      _onDelete;
      constructor(config, actions) {
        this.reference = () => {
          const { name, columns, foreignColumns } = config();
          return { name, columns, foreignTable: foreignColumns[0].table, foreignColumns };
        };
        if (actions) {
          this._onUpdate = actions.onUpdate;
          this._onDelete = actions.onDelete;
        }
      }
      onUpdate(action) {
        this._onUpdate = action;
        return this;
      }
      onDelete(action) {
        this._onDelete = action;
        return this;
      }
      /** @internal */
      build(table) {
        return new ForeignKey2(table, this);
      }
    }, "ForeignKeyBuilder2");
    __name2(ForeignKeyBuilder2, "ForeignKeyBuilder");
    _a43 = entityKind;
    __publicField(ForeignKeyBuilder2, _a43, "SQLiteForeignKeyBuilder");
    ForeignKey2 = /* @__PURE__ */ __name(class {
      constructor(table, builder) {
        this.table = table;
        this.reference = builder.reference;
        this.onUpdate = builder._onUpdate;
        this.onDelete = builder._onDelete;
      }
      reference;
      onUpdate;
      onDelete;
      getName() {
        const { name, columns, foreignColumns } = this.reference();
        const columnNames = columns.map((column) => column.name);
        const foreignColumnNames = foreignColumns.map((column) => column.name);
        const chunks = [
          this.table[TableName],
          ...columnNames,
          foreignColumns[0].table[TableName],
          ...foreignColumnNames
        ];
        return name ?? `${chunks.join("_")}_fk`;
      }
    }, "ForeignKey2");
    __name2(ForeignKey2, "ForeignKey");
    _a44 = entityKind;
    __publicField(ForeignKey2, _a44, "SQLiteForeignKey");
  }
});
function uniqueKeyName2(table, columns) {
  return `${table[TableName]}_${columns.join("_")}_unique`;
}
__name(uniqueKeyName2, "uniqueKeyName2");
var _a45;
var UniqueConstraintBuilder2;
var _a46;
var UniqueOnConstraintBuilder2;
var _a47;
var UniqueConstraint2;
var init_unique_constraint2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/unique-constraint.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table_utils();
    __name2(uniqueKeyName2, "uniqueKeyName");
    UniqueConstraintBuilder2 = /* @__PURE__ */ __name(class {
      constructor(columns, name) {
        this.name = name;
        this.columns = columns;
      }
      /** @internal */
      columns;
      /** @internal */
      build(table) {
        return new UniqueConstraint2(table, this.columns, this.name);
      }
    }, "UniqueConstraintBuilder2");
    __name2(UniqueConstraintBuilder2, "UniqueConstraintBuilder");
    _a45 = entityKind;
    __publicField(UniqueConstraintBuilder2, _a45, "SQLiteUniqueConstraintBuilder");
    UniqueOnConstraintBuilder2 = /* @__PURE__ */ __name(class {
      /** @internal */
      name;
      constructor(name) {
        this.name = name;
      }
      on(...columns) {
        return new UniqueConstraintBuilder2(columns, this.name);
      }
    }, "UniqueOnConstraintBuilder2");
    __name2(UniqueOnConstraintBuilder2, "UniqueOnConstraintBuilder");
    _a46 = entityKind;
    __publicField(UniqueOnConstraintBuilder2, _a46, "SQLiteUniqueOnConstraintBuilder");
    UniqueConstraint2 = /* @__PURE__ */ __name(class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name ?? uniqueKeyName2(this.table, this.columns.map((column) => column.name));
      }
      columns;
      name;
      getName() {
        return this.name;
      }
    }, "UniqueConstraint2");
    __name2(UniqueConstraint2, "UniqueConstraint");
    _a47 = entityKind;
    __publicField(UniqueConstraint2, _a47, "SQLiteUniqueConstraint");
  }
});
var _a48;
var SQLiteColumnBuilder;
var _a49;
var SQLiteColumn;
var init_common2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/common.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_column_builder();
    init_column();
    init_entity();
    init_foreign_keys2();
    init_unique_constraint2();
    SQLiteColumnBuilder = /* @__PURE__ */ __name(class extends ColumnBuilder {
      foreignKeyConfigs = [];
      references(ref, actions = {}) {
        this.foreignKeyConfigs.push({ ref, actions });
        return this;
      }
      unique(name) {
        this.config.isUnique = true;
        this.config.uniqueName = name;
        return this;
      }
      generatedAlwaysAs(as, config) {
        this.config.generated = {
          as,
          type: "always",
          mode: config?.mode ?? "virtual"
        };
        return this;
      }
      /** @internal */
      buildForeignKeys(column, table) {
        return this.foreignKeyConfigs.map(({ ref, actions }) => {
          return ((ref2, actions2) => {
            const builder = new ForeignKeyBuilder2(() => {
              const foreignColumn = ref2();
              return { columns: [column], foreignColumns: [foreignColumn] };
            });
            if (actions2.onUpdate) {
              builder.onUpdate(actions2.onUpdate);
            }
            if (actions2.onDelete) {
              builder.onDelete(actions2.onDelete);
            }
            return builder.build(table);
          })(ref, actions);
        });
      }
    }, "SQLiteColumnBuilder");
    __name2(SQLiteColumnBuilder, "SQLiteColumnBuilder");
    _a48 = entityKind;
    __publicField(SQLiteColumnBuilder, _a48, "SQLiteColumnBuilder");
    SQLiteColumn = /* @__PURE__ */ __name(class extends Column {
      constructor(table, config) {
        if (!config.uniqueName) {
          config.uniqueName = uniqueKeyName2(table, [config.name]);
        }
        super(table, config);
        this.table = table;
      }
    }, "SQLiteColumn");
    __name2(SQLiteColumn, "SQLiteColumn");
    _a49 = entityKind;
    __publicField(SQLiteColumn, _a49, "SQLiteColumn");
  }
});
function blob(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "json") {
    return new SQLiteBlobJsonBuilder(name);
  }
  if (config?.mode === "bigint") {
    return new SQLiteBigIntBuilder(name);
  }
  return new SQLiteBlobBufferBuilder(name);
}
__name(blob, "blob");
var _a50;
var SQLiteBigIntBuilder;
var _a51;
var SQLiteBigInt;
var _a52;
var SQLiteBlobJsonBuilder;
var _a53;
var SQLiteBlobJson;
var _a54;
var SQLiteBlobBufferBuilder;
var _a55;
var SQLiteBlobBuffer;
var init_blob = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/blob.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_utils();
    init_common2();
    SQLiteBigIntBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "bigint", "SQLiteBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteBigInt(table, this.config);
      }
    }, "SQLiteBigIntBuilder");
    __name2(SQLiteBigIntBuilder, "SQLiteBigIntBuilder");
    _a50 = entityKind;
    __publicField(SQLiteBigIntBuilder, _a50, "SQLiteBigIntBuilder");
    SQLiteBigInt = /* @__PURE__ */ __name(class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return BigInt(value.toString());
        }
        if (value instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          return BigInt(decoder.decode(value));
        }
        return BigInt(String.fromCodePoint(...value));
      }
      mapToDriverValue(value) {
        return Buffer.from(value.toString());
      }
    }, "SQLiteBigInt");
    __name2(SQLiteBigInt, "SQLiteBigInt");
    _a51 = entityKind;
    __publicField(SQLiteBigInt, _a51, "SQLiteBigInt");
    SQLiteBlobJsonBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "json", "SQLiteBlobJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobJson(
          table,
          this.config
        );
      }
    }, "SQLiteBlobJsonBuilder");
    __name2(SQLiteBlobJsonBuilder, "SQLiteBlobJsonBuilder");
    _a52 = entityKind;
    __publicField(SQLiteBlobJsonBuilder, _a52, "SQLiteBlobJsonBuilder");
    SQLiteBlobJson = /* @__PURE__ */ __name(class extends SQLiteColumn {
      getSQLType() {
        return "blob";
      }
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return JSON.parse(value.toString());
        }
        if (value instanceof ArrayBuffer) {
          const decoder = new TextDecoder();
          return JSON.parse(decoder.decode(value));
        }
        return JSON.parse(String.fromCodePoint(...value));
      }
      mapToDriverValue(value) {
        return Buffer.from(JSON.stringify(value));
      }
    }, "SQLiteBlobJson");
    __name2(SQLiteBlobJson, "SQLiteBlobJson");
    _a53 = entityKind;
    __publicField(SQLiteBlobJson, _a53, "SQLiteBlobJson");
    SQLiteBlobBufferBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "buffer", "SQLiteBlobBuffer");
      }
      /** @internal */
      build(table) {
        return new SQLiteBlobBuffer(table, this.config);
      }
    }, "SQLiteBlobBufferBuilder");
    __name2(SQLiteBlobBufferBuilder, "SQLiteBlobBufferBuilder");
    _a54 = entityKind;
    __publicField(SQLiteBlobBufferBuilder, _a54, "SQLiteBlobBufferBuilder");
    SQLiteBlobBuffer = /* @__PURE__ */ __name(class extends SQLiteColumn {
      mapFromDriverValue(value) {
        if (Buffer.isBuffer(value)) {
          return value;
        }
        return Buffer.from(value);
      }
      getSQLType() {
        return "blob";
      }
    }, "SQLiteBlobBuffer");
    __name2(SQLiteBlobBuffer, "SQLiteBlobBuffer");
    _a55 = entityKind;
    __publicField(SQLiteBlobBuffer, _a55, "SQLiteBlobBuffer");
    __name2(blob, "blob");
  }
});
function customType(customTypeParams) {
  return (a, b) => {
    const { name, config } = getColumnNameAndConfig(a, b);
    return new SQLiteCustomColumnBuilder(
      name,
      config,
      customTypeParams
    );
  };
}
__name(customType, "customType");
var _a56;
var SQLiteCustomColumnBuilder;
var _a57;
var SQLiteCustomColumn;
var init_custom = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/custom.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_utils();
    init_common2();
    SQLiteCustomColumnBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name, fieldConfig, customTypeParams) {
        super(name, "custom", "SQLiteCustomColumn");
        this.config.fieldConfig = fieldConfig;
        this.config.customTypeParams = customTypeParams;
      }
      /** @internal */
      build(table) {
        return new SQLiteCustomColumn(
          table,
          this.config
        );
      }
    }, "SQLiteCustomColumnBuilder");
    __name2(SQLiteCustomColumnBuilder, "SQLiteCustomColumnBuilder");
    _a56 = entityKind;
    __publicField(SQLiteCustomColumnBuilder, _a56, "SQLiteCustomColumnBuilder");
    SQLiteCustomColumn = /* @__PURE__ */ __name(class extends SQLiteColumn {
      sqlName;
      mapTo;
      mapFrom;
      constructor(table, config) {
        super(table, config);
        this.sqlName = config.customTypeParams.dataType(config.fieldConfig);
        this.mapTo = config.customTypeParams.toDriver;
        this.mapFrom = config.customTypeParams.fromDriver;
      }
      getSQLType() {
        return this.sqlName;
      }
      mapFromDriverValue(value) {
        return typeof this.mapFrom === "function" ? this.mapFrom(value) : value;
      }
      mapToDriverValue(value) {
        return typeof this.mapTo === "function" ? this.mapTo(value) : value;
      }
    }, "SQLiteCustomColumn");
    __name2(SQLiteCustomColumn, "SQLiteCustomColumn");
    _a57 = entityKind;
    __publicField(SQLiteCustomColumn, _a57, "SQLiteCustomColumn");
    __name2(customType, "customType");
  }
});
function integer(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config?.mode === "timestamp" || config?.mode === "timestamp_ms") {
    return new SQLiteTimestampBuilder(name, config.mode);
  }
  if (config?.mode === "boolean") {
    return new SQLiteBooleanBuilder(name, config.mode);
  }
  return new SQLiteIntegerBuilder(name);
}
__name(integer, "integer");
var _a58;
var SQLiteBaseIntegerBuilder;
var _a59;
var SQLiteBaseInteger;
var _a60;
var SQLiteIntegerBuilder;
var _a61;
var SQLiteInteger;
var _a62;
var SQLiteTimestampBuilder;
var _a63;
var SQLiteTimestamp;
var _a64;
var SQLiteBooleanBuilder;
var _a65;
var SQLiteBoolean;
var init_integer = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/integer.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_sql();
    init_utils();
    init_common2();
    SQLiteBaseIntegerBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name, dataType, columnType) {
        super(name, dataType, columnType);
        this.config.autoIncrement = false;
      }
      primaryKey(config) {
        if (config?.autoIncrement) {
          this.config.autoIncrement = true;
        }
        this.config.hasDefault = true;
        return super.primaryKey();
      }
    }, "SQLiteBaseIntegerBuilder");
    __name2(SQLiteBaseIntegerBuilder, "SQLiteBaseIntegerBuilder");
    _a58 = entityKind;
    __publicField(SQLiteBaseIntegerBuilder, _a58, "SQLiteBaseIntegerBuilder");
    SQLiteBaseInteger = /* @__PURE__ */ __name(class extends SQLiteColumn {
      autoIncrement = this.config.autoIncrement;
      getSQLType() {
        return "integer";
      }
    }, "SQLiteBaseInteger");
    __name2(SQLiteBaseInteger, "SQLiteBaseInteger");
    _a59 = entityKind;
    __publicField(SQLiteBaseInteger, _a59, "SQLiteBaseInteger");
    SQLiteIntegerBuilder = /* @__PURE__ */ __name(class extends SQLiteBaseIntegerBuilder {
      constructor(name) {
        super(name, "number", "SQLiteInteger");
      }
      build(table) {
        return new SQLiteInteger(
          table,
          this.config
        );
      }
    }, "SQLiteIntegerBuilder");
    __name2(SQLiteIntegerBuilder, "SQLiteIntegerBuilder");
    _a60 = entityKind;
    __publicField(SQLiteIntegerBuilder, _a60, "SQLiteIntegerBuilder");
    SQLiteInteger = /* @__PURE__ */ __name(class extends SQLiteBaseInteger {
    }, "SQLiteInteger");
    __name2(SQLiteInteger, "SQLiteInteger");
    _a61 = entityKind;
    __publicField(SQLiteInteger, _a61, "SQLiteInteger");
    SQLiteTimestampBuilder = /* @__PURE__ */ __name(class extends SQLiteBaseIntegerBuilder {
      constructor(name, mode) {
        super(name, "date", "SQLiteTimestamp");
        this.config.mode = mode;
      }
      /**
       * @deprecated Use `default()` with your own expression instead.
       *
       * Adds `DEFAULT (cast((julianday('now') - 2440587.5)*86400000 as integer))` to the column, which is the current epoch timestamp in milliseconds.
       */
      defaultNow() {
        return this.default(sql`(cast((julianday('now') - 2440587.5)*86400000 as integer))`);
      }
      build(table) {
        return new SQLiteTimestamp(
          table,
          this.config
        );
      }
    }, "SQLiteTimestampBuilder");
    __name2(SQLiteTimestampBuilder, "SQLiteTimestampBuilder");
    _a62 = entityKind;
    __publicField(SQLiteTimestampBuilder, _a62, "SQLiteTimestampBuilder");
    SQLiteTimestamp = /* @__PURE__ */ __name(class extends SQLiteBaseInteger {
      mode = this.config.mode;
      mapFromDriverValue(value) {
        if (this.config.mode === "timestamp") {
          return new Date(value * 1e3);
        }
        return new Date(value);
      }
      mapToDriverValue(value) {
        const unix = value.getTime();
        if (this.config.mode === "timestamp") {
          return Math.floor(unix / 1e3);
        }
        return unix;
      }
    }, "SQLiteTimestamp");
    __name2(SQLiteTimestamp, "SQLiteTimestamp");
    _a63 = entityKind;
    __publicField(SQLiteTimestamp, _a63, "SQLiteTimestamp");
    SQLiteBooleanBuilder = /* @__PURE__ */ __name(class extends SQLiteBaseIntegerBuilder {
      constructor(name, mode) {
        super(name, "boolean", "SQLiteBoolean");
        this.config.mode = mode;
      }
      build(table) {
        return new SQLiteBoolean(
          table,
          this.config
        );
      }
    }, "SQLiteBooleanBuilder");
    __name2(SQLiteBooleanBuilder, "SQLiteBooleanBuilder");
    _a64 = entityKind;
    __publicField(SQLiteBooleanBuilder, _a64, "SQLiteBooleanBuilder");
    SQLiteBoolean = /* @__PURE__ */ __name(class extends SQLiteBaseInteger {
      mode = this.config.mode;
      mapFromDriverValue(value) {
        return Number(value) === 1;
      }
      mapToDriverValue(value) {
        return value ? 1 : 0;
      }
    }, "SQLiteBoolean");
    __name2(SQLiteBoolean, "SQLiteBoolean");
    _a65 = entityKind;
    __publicField(SQLiteBoolean, _a65, "SQLiteBoolean");
    __name2(integer, "integer");
  }
});
function numeric(a, b) {
  const { name, config } = getColumnNameAndConfig(a, b);
  const mode = config?.mode;
  return mode === "number" ? new SQLiteNumericNumberBuilder(name) : mode === "bigint" ? new SQLiteNumericBigIntBuilder(name) : new SQLiteNumericBuilder(name);
}
__name(numeric, "numeric");
var _a66;
var SQLiteNumericBuilder;
var _a67;
var SQLiteNumeric;
var _a68;
var SQLiteNumericNumberBuilder;
var _a69;
var SQLiteNumericNumber;
var _a70;
var SQLiteNumericBigIntBuilder;
var _a71;
var SQLiteNumericBigInt;
var init_numeric = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/numeric.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_utils();
    init_common2();
    SQLiteNumericBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "string", "SQLiteNumeric");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumeric(
          table,
          this.config
        );
      }
    }, "SQLiteNumericBuilder");
    __name2(SQLiteNumericBuilder, "SQLiteNumericBuilder");
    _a66 = entityKind;
    __publicField(SQLiteNumericBuilder, _a66, "SQLiteNumericBuilder");
    SQLiteNumeric = /* @__PURE__ */ __name(class extends SQLiteColumn {
      mapFromDriverValue(value) {
        if (typeof value === "string")
          return value;
        return String(value);
      }
      getSQLType() {
        return "numeric";
      }
    }, "SQLiteNumeric");
    __name2(SQLiteNumeric, "SQLiteNumeric");
    _a67 = entityKind;
    __publicField(SQLiteNumeric, _a67, "SQLiteNumeric");
    SQLiteNumericNumberBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "number", "SQLiteNumericNumber");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumericNumber(
          table,
          this.config
        );
      }
    }, "SQLiteNumericNumberBuilder");
    __name2(SQLiteNumericNumberBuilder, "SQLiteNumericNumberBuilder");
    _a68 = entityKind;
    __publicField(SQLiteNumericNumberBuilder, _a68, "SQLiteNumericNumberBuilder");
    SQLiteNumericNumber = /* @__PURE__ */ __name(class extends SQLiteColumn {
      mapFromDriverValue(value) {
        if (typeof value === "number")
          return value;
        return Number(value);
      }
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    }, "SQLiteNumericNumber");
    __name2(SQLiteNumericNumber, "SQLiteNumericNumber");
    _a69 = entityKind;
    __publicField(SQLiteNumericNumber, _a69, "SQLiteNumericNumber");
    SQLiteNumericBigIntBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "bigint", "SQLiteNumericBigInt");
      }
      /** @internal */
      build(table) {
        return new SQLiteNumericBigInt(
          table,
          this.config
        );
      }
    }, "SQLiteNumericBigIntBuilder");
    __name2(SQLiteNumericBigIntBuilder, "SQLiteNumericBigIntBuilder");
    _a70 = entityKind;
    __publicField(SQLiteNumericBigIntBuilder, _a70, "SQLiteNumericBigIntBuilder");
    SQLiteNumericBigInt = /* @__PURE__ */ __name(class extends SQLiteColumn {
      mapFromDriverValue = BigInt;
      mapToDriverValue = String;
      getSQLType() {
        return "numeric";
      }
    }, "SQLiteNumericBigInt");
    __name2(SQLiteNumericBigInt, "SQLiteNumericBigInt");
    _a71 = entityKind;
    __publicField(SQLiteNumericBigInt, _a71, "SQLiteNumericBigInt");
    __name2(numeric, "numeric");
  }
});
function real(name) {
  return new SQLiteRealBuilder(name ?? "");
}
__name(real, "real");
var _a72;
var SQLiteRealBuilder;
var _a73;
var SQLiteReal;
var init_real = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/real.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_common2();
    SQLiteRealBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "number", "SQLiteReal");
      }
      /** @internal */
      build(table) {
        return new SQLiteReal(table, this.config);
      }
    }, "SQLiteRealBuilder");
    __name2(SQLiteRealBuilder, "SQLiteRealBuilder");
    _a72 = entityKind;
    __publicField(SQLiteRealBuilder, _a72, "SQLiteRealBuilder");
    SQLiteReal = /* @__PURE__ */ __name(class extends SQLiteColumn {
      getSQLType() {
        return "real";
      }
    }, "SQLiteReal");
    __name2(SQLiteReal, "SQLiteReal");
    _a73 = entityKind;
    __publicField(SQLiteReal, _a73, "SQLiteReal");
    __name2(real, "real");
  }
});
function text(a, b = {}) {
  const { name, config } = getColumnNameAndConfig(a, b);
  if (config.mode === "json") {
    return new SQLiteTextJsonBuilder(name);
  }
  return new SQLiteTextBuilder(name, config);
}
__name(text, "text");
var _a74;
var SQLiteTextBuilder;
var _a75;
var SQLiteText;
var _a76;
var SQLiteTextJsonBuilder;
var _a77;
var SQLiteTextJson;
var init_text = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/text.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_utils();
    init_common2();
    SQLiteTextBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name, config) {
        super(name, "string", "SQLiteText");
        this.config.enumValues = config.enum;
        this.config.length = config.length;
      }
      /** @internal */
      build(table) {
        return new SQLiteText(
          table,
          this.config
        );
      }
    }, "SQLiteTextBuilder");
    __name2(SQLiteTextBuilder, "SQLiteTextBuilder");
    _a74 = entityKind;
    __publicField(SQLiteTextBuilder, _a74, "SQLiteTextBuilder");
    SQLiteText = /* @__PURE__ */ __name(class extends SQLiteColumn {
      enumValues = this.config.enumValues;
      length = this.config.length;
      constructor(table, config) {
        super(table, config);
      }
      getSQLType() {
        return `text${this.config.length ? `(${this.config.length})` : ""}`;
      }
    }, "SQLiteText");
    __name2(SQLiteText, "SQLiteText");
    _a75 = entityKind;
    __publicField(SQLiteText, _a75, "SQLiteText");
    SQLiteTextJsonBuilder = /* @__PURE__ */ __name(class extends SQLiteColumnBuilder {
      constructor(name) {
        super(name, "json", "SQLiteTextJson");
      }
      /** @internal */
      build(table) {
        return new SQLiteTextJson(
          table,
          this.config
        );
      }
    }, "SQLiteTextJsonBuilder");
    __name2(SQLiteTextJsonBuilder, "SQLiteTextJsonBuilder");
    _a76 = entityKind;
    __publicField(SQLiteTextJsonBuilder, _a76, "SQLiteTextJsonBuilder");
    SQLiteTextJson = /* @__PURE__ */ __name(class extends SQLiteColumn {
      getSQLType() {
        return "text";
      }
      mapFromDriverValue(value) {
        return JSON.parse(value);
      }
      mapToDriverValue(value) {
        return JSON.stringify(value);
      }
    }, "SQLiteTextJson");
    __name2(SQLiteTextJson, "SQLiteTextJson");
    _a77 = entityKind;
    __publicField(SQLiteTextJson, _a77, "SQLiteTextJson");
    __name2(text, "text");
  }
});
function getSQLiteColumnBuilders() {
  return {
    blob,
    customType,
    integer,
    numeric,
    real,
    text
  };
}
__name(getSQLiteColumnBuilders, "getSQLiteColumnBuilders");
var init_all = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/all.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_blob();
    init_custom();
    init_integer();
    init_numeric();
    init_real();
    init_text();
    __name2(getSQLiteColumnBuilders, "getSQLiteColumnBuilders");
  }
});
function sqliteTableBase(name, columns, extraConfig, schema, baseName = name) {
  const rawTable = new SQLiteTable(name, schema, baseName);
  const parsedColumns = typeof columns === "function" ? columns(getSQLiteColumnBuilders()) : columns;
  const builtColumns = Object.fromEntries(
    Object.entries(parsedColumns).map(([name2, colBuilderBase]) => {
      const colBuilder = colBuilderBase;
      colBuilder.setName(name2);
      const column = colBuilder.build(rawTable);
      rawTable[InlineForeignKeys2].push(...colBuilder.buildForeignKeys(column, rawTable));
      return [name2, column];
    })
  );
  const table = Object.assign(rawTable, builtColumns);
  table[Table.Symbol.Columns] = builtColumns;
  table[Table.Symbol.ExtraConfigColumns] = builtColumns;
  if (extraConfig) {
    table[SQLiteTable.Symbol.ExtraConfigBuilder] = extraConfig;
  }
  return table;
}
__name(sqliteTableBase, "sqliteTableBase");
var InlineForeignKeys2;
var _a78;
var SQLiteTable;
var sqliteTable;
var init_table3 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/table.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table();
    init_all();
    InlineForeignKeys2 = Symbol.for("drizzle:SQLiteInlineForeignKeys");
    SQLiteTable = /* @__PURE__ */ __name(class extends Table {
      /** @internal */
      [(_a78 = entityKind, Table.Symbol.Columns)];
      /** @internal */
      [InlineForeignKeys2] = [];
      /** @internal */
      [Table.Symbol.ExtraConfigBuilder] = void 0;
    }, "SQLiteTable");
    __name2(SQLiteTable, "SQLiteTable");
    __publicField(SQLiteTable, _a78, "SQLiteTable");
    __publicField(SQLiteTable, "Symbol", Object.assign({}, Table.Symbol, {
      InlineForeignKeys: InlineForeignKeys2
    }));
    __name2(sqliteTableBase, "sqliteTableBase");
    sqliteTable = /* @__PURE__ */ __name2((name, columns, extraConfig) => {
      return sqliteTableBase(name, columns, extraConfig);
    }, "sqliteTable");
  }
});
var _a79;
var CheckBuilder;
var _a80;
var Check;
var init_checks = __esm({
  "../node_modules/drizzle-orm/sqlite-core/checks.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    CheckBuilder = /* @__PURE__ */ __name(class {
      constructor(name, value) {
        this.name = name;
        this.value = value;
      }
      brand;
      build(table) {
        return new Check(table, this);
      }
    }, "CheckBuilder");
    __name2(CheckBuilder, "CheckBuilder");
    _a79 = entityKind;
    __publicField(CheckBuilder, _a79, "SQLiteCheckBuilder");
    Check = /* @__PURE__ */ __name(class {
      constructor(table, builder) {
        this.table = table;
        this.name = builder.name;
        this.value = builder.value;
      }
      name;
      value;
    }, "Check");
    __name2(Check, "Check");
    _a80 = entityKind;
    __publicField(Check, _a80, "SQLiteCheck");
  }
});
var _a81;
var IndexBuilderOn;
var _a82;
var IndexBuilder;
var _a83;
var Index;
var init_indexes = __esm({
  "../node_modules/drizzle-orm/sqlite-core/indexes.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    IndexBuilderOn = /* @__PURE__ */ __name(class {
      constructor(name, unique) {
        this.name = name;
        this.unique = unique;
      }
      on(...columns) {
        return new IndexBuilder(this.name, columns, this.unique);
      }
    }, "IndexBuilderOn");
    __name2(IndexBuilderOn, "IndexBuilderOn");
    _a81 = entityKind;
    __publicField(IndexBuilderOn, _a81, "SQLiteIndexBuilderOn");
    IndexBuilder = /* @__PURE__ */ __name(class {
      /** @internal */
      config;
      constructor(name, columns, unique) {
        this.config = {
          name,
          columns,
          unique,
          where: void 0
        };
      }
      /**
       * Condition for partial index.
       */
      where(condition) {
        this.config.where = condition;
        return this;
      }
      /** @internal */
      build(table) {
        return new Index(this.config, table);
      }
    }, "IndexBuilder");
    __name2(IndexBuilder, "IndexBuilder");
    _a82 = entityKind;
    __publicField(IndexBuilder, _a82, "SQLiteIndexBuilder");
    Index = /* @__PURE__ */ __name(class {
      config;
      constructor(config, table) {
        this.config = { ...config, table };
      }
    }, "Index");
    __name2(Index, "Index");
    _a83 = entityKind;
    __publicField(Index, _a83, "SQLiteIndex");
  }
});
var _a84;
var PrimaryKeyBuilder2;
var _a85;
var PrimaryKey2;
var init_primary_keys2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/primary-keys.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table3();
    PrimaryKeyBuilder2 = /* @__PURE__ */ __name(class {
      /** @internal */
      columns;
      /** @internal */
      name;
      constructor(columns, name) {
        this.columns = columns;
        this.name = name;
      }
      /** @internal */
      build(table) {
        return new PrimaryKey2(table, this.columns, this.name);
      }
    }, "PrimaryKeyBuilder2");
    __name2(PrimaryKeyBuilder2, "PrimaryKeyBuilder");
    _a84 = entityKind;
    __publicField(PrimaryKeyBuilder2, _a84, "SQLitePrimaryKeyBuilder");
    PrimaryKey2 = /* @__PURE__ */ __name(class {
      constructor(table, columns, name) {
        this.table = table;
        this.columns = columns;
        this.name = name;
      }
      columns;
      name;
      getName() {
        return this.name ?? `${this.table[SQLiteTable.Symbol.Name]}_${this.columns.map((column) => column.name).join("_")}_pk`;
      }
    }, "PrimaryKey2");
    __name2(PrimaryKey2, "PrimaryKey");
    _a85 = entityKind;
    __publicField(PrimaryKey2, _a85, "SQLitePrimaryKey");
  }
});
function extractUsedTable(table) {
  if (is(table, SQLiteTable)) {
    return [`${table[Table.Symbol.BaseName]}`];
  }
  if (is(table, Subquery)) {
    return table._.usedTables ?? [];
  }
  if (is(table, SQL)) {
    return table.usedTables ?? [];
  }
  return [];
}
__name(extractUsedTable, "extractUsedTable");
var init_utils2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/utils.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_sql();
    init_subquery();
    init_table();
    init_table3();
    __name2(extractUsedTable, "extractUsedTable");
  }
});
var _a86;
var SQLiteDeleteBase;
var init_delete = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/delete.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_query_promise();
    init_selection_proxy();
    init_table3();
    init_table();
    init_utils();
    init_utils2();
    SQLiteDeleteBase = /* @__PURE__ */ __name(class extends QueryPromise {
      constructor(table, session, dialect, withList) {
        super();
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.config = { table, withList };
      }
      /** @internal */
      config;
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will delete only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be deleted.
       *
       * ```ts
       * // Delete all cars with green color
       * db.delete(cars).where(eq(cars.color, 'green'));
       * // or
       * db.delete(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Delete all BMW cars with a green color
       * db.delete(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Delete all cars with the green or blue color
       * db.delete(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.table[Table.Symbol.Columns],
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          this.config.orderBy = orderByArray;
        } else {
          const orderByArray = columns;
          this.config.orderBy = orderByArray;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      returning(fields = this.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildDeleteQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "delete",
            tables: extractUsedTable(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute(placeholderValues) {
        return this._prepare().execute(placeholderValues);
      }
      $dynamic() {
        return this;
      }
    }, "SQLiteDeleteBase");
    __name2(SQLiteDeleteBase, "SQLiteDeleteBase");
    _a86 = entityKind;
    __publicField(SQLiteDeleteBase, _a86, "SQLiteDelete");
  }
});
function toSnakeCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.map((word) => word.toLowerCase()).join("_");
}
__name(toSnakeCase, "toSnakeCase");
function toCamelCase(input) {
  const words = input.replace(/['\u2019]/g, "").match(/[\da-z]+|[A-Z]+(?![a-z])|[A-Z][\da-z]+/g) ?? [];
  return words.reduce((acc, word, i) => {
    const formattedWord = i === 0 ? word.toLowerCase() : `${word[0].toUpperCase()}${word.slice(1)}`;
    return acc + formattedWord;
  }, "");
}
__name(toCamelCase, "toCamelCase");
function noopCase(input) {
  return input;
}
__name(noopCase, "noopCase");
var _a87;
var CasingCache;
var init_casing = __esm({
  "../node_modules/drizzle-orm/casing.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_table();
    __name2(toSnakeCase, "toSnakeCase");
    __name2(toCamelCase, "toCamelCase");
    __name2(noopCase, "noopCase");
    CasingCache = /* @__PURE__ */ __name(class {
      /** @internal */
      cache = {};
      cachedTables = {};
      convert;
      constructor(casing) {
        this.convert = casing === "snake_case" ? toSnakeCase : casing === "camelCase" ? toCamelCase : noopCase;
      }
      getColumnCasing(column) {
        if (!column.keyAsName)
          return column.name;
        const schema = column.table[Table.Symbol.Schema] ?? "public";
        const tableName = column.table[Table.Symbol.OriginalName];
        const key = `${schema}.${tableName}.${column.name}`;
        if (!this.cache[key]) {
          this.cacheTable(column.table);
        }
        return this.cache[key];
      }
      cacheTable(table) {
        const schema = table[Table.Symbol.Schema] ?? "public";
        const tableName = table[Table.Symbol.OriginalName];
        const tableKey = `${schema}.${tableName}`;
        if (!this.cachedTables[tableKey]) {
          for (const column of Object.values(table[Table.Symbol.Columns])) {
            const columnKey = `${tableKey}.${column.name}`;
            this.cache[columnKey] = this.convert(column.name);
          }
          this.cachedTables[tableKey] = true;
        }
      }
      clearCache() {
        this.cache = {};
        this.cachedTables = {};
      }
    }, "CasingCache");
    __name2(CasingCache, "CasingCache");
    _a87 = entityKind;
    __publicField(CasingCache, _a87, "CasingCache");
  }
});
var _a88;
var DrizzleError;
var _a89;
var TransactionRollbackError;
var init_errors = __esm({
  "../node_modules/drizzle-orm/errors.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    DrizzleError = /* @__PURE__ */ __name(class extends Error {
      constructor({ message, cause }) {
        super(message);
        this.name = "DrizzleError";
        this.cause = cause;
      }
    }, "DrizzleError");
    __name2(DrizzleError, "DrizzleError");
    _a88 = entityKind;
    __publicField(DrizzleError, _a88, "DrizzleError");
    TransactionRollbackError = /* @__PURE__ */ __name(class extends DrizzleError {
      constructor() {
        super({ message: "Rollback" });
      }
    }, "TransactionRollbackError");
    __name2(TransactionRollbackError, "TransactionRollbackError");
    _a89 = entityKind;
    __publicField(TransactionRollbackError, _a89, "TransactionRollbackError");
  }
});
var init_aggregate = __esm({
  "../node_modules/drizzle-orm/sql/functions/aggregate.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
  }
});
var init_vector = __esm({
  "../node_modules/drizzle-orm/sql/functions/vector.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
  }
});
var init_functions = __esm({
  "../node_modules/drizzle-orm/sql/functions/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_aggregate();
    init_vector();
  }
});
var init_sql2 = __esm({
  "../node_modules/drizzle-orm/sql/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_expressions();
    init_functions();
    init_sql();
  }
});
var init_columns = __esm({
  "../node_modules/drizzle-orm/sqlite-core/columns/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_blob();
    init_common2();
    init_custom();
    init_integer();
    init_numeric();
    init_real();
    init_text();
  }
});
var _a90;
var SQLiteViewBase;
var init_view_base = __esm({
  "../node_modules/drizzle-orm/sqlite-core/view-base.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_sql();
    SQLiteViewBase = /* @__PURE__ */ __name(class extends View {
    }, "SQLiteViewBase");
    __name2(SQLiteViewBase, "SQLiteViewBase");
    _a90 = entityKind;
    __publicField(SQLiteViewBase, _a90, "SQLiteViewBase");
  }
});
var _a91;
var SQLiteDialect;
var _a92;
var SQLiteSyncDialect;
var _a93;
var SQLiteAsyncDialect;
var init_dialect = __esm({
  "../node_modules/drizzle-orm/sqlite-core/dialect.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_alias();
    init_casing();
    init_column();
    init_entity();
    init_errors();
    init_relations();
    init_sql2();
    init_sql();
    init_columns();
    init_table3();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_view_base();
    SQLiteDialect = /* @__PURE__ */ __name(class {
      /** @internal */
      casing;
      constructor(config) {
        this.casing = new CasingCache(config?.casing);
      }
      escapeName(name) {
        return `"${name}"`;
      }
      escapeParam(_num) {
        return "?";
      }
      escapeString(str) {
        return `'${str.replace(/'/g, "''")}'`;
      }
      buildWithCTE(queries) {
        if (!queries?.length)
          return void 0;
        const withSqlChunks = [sql`with `];
        for (const [i, w] of queries.entries()) {
          withSqlChunks.push(sql`${sql.identifier(w._.alias)} as (${w._.sql})`);
          if (i < queries.length - 1) {
            withSqlChunks.push(sql`, `);
          }
        }
        withSqlChunks.push(sql` `);
        return sql.join(withSqlChunks);
      }
      buildDeleteQuery({ table, where, returning, withList, limit, orderBy }) {
        const withSql = this.buildWithCTE(withList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return sql`${withSql}delete from ${table}${whereSql}${returningSql}${orderBySql}${limitSql}`;
      }
      buildUpdateSet(table, set) {
        const tableColumns = table[Table.Symbol.Columns];
        const columnNames = Object.keys(tableColumns).filter(
          (colName) => set[colName] !== void 0 || tableColumns[colName]?.onUpdateFn !== void 0
        );
        const setSize = columnNames.length;
        return sql.join(columnNames.flatMap((colName, i) => {
          const col = tableColumns[colName];
          const value = set[colName] ?? sql.param(col.onUpdateFn(), col);
          const res = sql`${sql.identifier(this.casing.getColumnCasing(col))} = ${value}`;
          if (i < setSize - 1) {
            return [res, sql.raw(", ")];
          }
          return [res];
        }));
      }
      buildUpdateQuery({ table, set, where, returning, withList, joins, from, limit, orderBy }) {
        const withSql = this.buildWithCTE(withList);
        const setSql = this.buildUpdateSet(table, set);
        const fromSql = from && sql.join([sql.raw(" from "), this.buildFromTable(from)]);
        const joinsSql = this.buildJoins(joins);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const whereSql = where ? sql` where ${where}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        return sql`${withSql}update ${table} set ${setSql}${fromSql}${joinsSql}${whereSql}${returningSql}${orderBySql}${limitSql}`;
      }
      /**
       * Builds selection SQL with provided fields/expressions
       *
       * Examples:
       *
       * `select <selection> from`
       *
       * `insert ... returning <selection>`
       *
       * If `isSingleTable` is true, then columns won't be prefixed with table name
       */
      buildSelection(fields, { isSingleTable = false } = {}) {
        const columnsLen = fields.length;
        const chunks = fields.flatMap(({ field }, i) => {
          const chunk = [];
          if (is(field, SQL.Aliased) && field.isSelectionField) {
            chunk.push(sql.identifier(field.fieldAlias));
          } else if (is(field, SQL.Aliased) || is(field, SQL)) {
            const query = is(field, SQL.Aliased) ? field.sql : field;
            if (isSingleTable) {
              chunk.push(
                new SQL(
                  query.queryChunks.map((c) => {
                    if (is(c, Column)) {
                      return sql.identifier(this.casing.getColumnCasing(c));
                    }
                    return c;
                  })
                )
              );
            } else {
              chunk.push(query);
            }
            if (is(field, SQL.Aliased)) {
              chunk.push(sql` as ${sql.identifier(field.fieldAlias)}`);
            }
          } else if (is(field, Column)) {
            const tableName = field.table[Table.Symbol.Name];
            if (field.columnType === "SQLiteNumericBigInt") {
              if (isSingleTable) {
                chunk.push(sql`cast(${sql.identifier(this.casing.getColumnCasing(field))} as text)`);
              } else {
                chunk.push(
                  sql`cast(${sql.identifier(tableName)}.${sql.identifier(this.casing.getColumnCasing(field))} as text)`
                );
              }
            } else {
              if (isSingleTable) {
                chunk.push(sql.identifier(this.casing.getColumnCasing(field)));
              } else {
                chunk.push(sql`${sql.identifier(tableName)}.${sql.identifier(this.casing.getColumnCasing(field))}`);
              }
            }
          }
          if (i < columnsLen - 1) {
            chunk.push(sql`, `);
          }
          return chunk;
        });
        return sql.join(chunks);
      }
      buildJoins(joins) {
        if (!joins || joins.length === 0) {
          return void 0;
        }
        const joinsArray = [];
        if (joins) {
          for (const [index, joinMeta] of joins.entries()) {
            if (index === 0) {
              joinsArray.push(sql` `);
            }
            const table = joinMeta.table;
            const onSql = joinMeta.on ? sql` on ${joinMeta.on}` : void 0;
            if (is(table, SQLiteTable)) {
              const tableName = table[SQLiteTable.Symbol.Name];
              const tableSchema = table[SQLiteTable.Symbol.Schema];
              const origTableName = table[SQLiteTable.Symbol.OriginalName];
              const alias = tableName === origTableName ? void 0 : joinMeta.alias;
              joinsArray.push(
                sql`${sql.raw(joinMeta.joinType)} join ${tableSchema ? sql`${sql.identifier(tableSchema)}.` : void 0}${sql.identifier(origTableName)}${alias && sql` ${sql.identifier(alias)}`}${onSql}`
              );
            } else {
              joinsArray.push(
                sql`${sql.raw(joinMeta.joinType)} join ${table}${onSql}`
              );
            }
            if (index < joins.length - 1) {
              joinsArray.push(sql` `);
            }
          }
        }
        return sql.join(joinsArray);
      }
      buildLimit(limit) {
        return typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
      }
      buildOrderBy(orderBy) {
        const orderByList = [];
        if (orderBy) {
          for (const [index, orderByValue] of orderBy.entries()) {
            orderByList.push(orderByValue);
            if (index < orderBy.length - 1) {
              orderByList.push(sql`, `);
            }
          }
        }
        return orderByList.length > 0 ? sql` order by ${sql.join(orderByList)}` : void 0;
      }
      buildFromTable(table) {
        if (is(table, Table) && table[Table.Symbol.IsAlias]) {
          return sql`${sql`${sql.identifier(table[Table.Symbol.Schema] ?? "")}.`.if(table[Table.Symbol.Schema])}${sql.identifier(table[Table.Symbol.OriginalName])} ${sql.identifier(table[Table.Symbol.Name])}`;
        }
        return table;
      }
      buildSelectQuery({
        withList,
        fields,
        fieldsFlat,
        where,
        having,
        table,
        joins,
        orderBy,
        groupBy,
        limit,
        offset,
        distinct,
        setOperators
      }) {
        const fieldsList = fieldsFlat ?? orderSelectedFields(fields);
        for (const f of fieldsList) {
          if (is(f.field, Column) && getTableName(f.field.table) !== (is(table, Subquery) ? table._.alias : is(table, SQLiteViewBase) ? table[ViewBaseConfig].name : is(table, SQL) ? void 0 : getTableName(table)) && !((table2) => joins?.some(
            ({ alias }) => alias === (table2[Table.Symbol.IsAlias] ? getTableName(table2) : table2[Table.Symbol.BaseName])
          ))(f.field.table)) {
            const tableName = getTableName(f.field.table);
            throw new Error(
              `Your "${f.path.join("->")}" field references a column "${tableName}"."${f.field.name}", but the table "${tableName}" is not part of the query! Did you forget to join it?`
            );
          }
        }
        const isSingleTable = !joins || joins.length === 0;
        const withSql = this.buildWithCTE(withList);
        const distinctSql = distinct ? sql` distinct` : void 0;
        const selection = this.buildSelection(fieldsList, { isSingleTable });
        const tableSql = this.buildFromTable(table);
        const joinsSql = this.buildJoins(joins);
        const whereSql = where ? sql` where ${where}` : void 0;
        const havingSql = having ? sql` having ${having}` : void 0;
        const groupByList = [];
        if (groupBy) {
          for (const [index, groupByValue] of groupBy.entries()) {
            groupByList.push(groupByValue);
            if (index < groupBy.length - 1) {
              groupByList.push(sql`, `);
            }
          }
        }
        const groupBySql = groupByList.length > 0 ? sql` group by ${sql.join(groupByList)}` : void 0;
        const orderBySql = this.buildOrderBy(orderBy);
        const limitSql = this.buildLimit(limit);
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        const finalQuery = sql`${withSql}select${distinctSql} ${selection} from ${tableSql}${joinsSql}${whereSql}${groupBySql}${havingSql}${orderBySql}${limitSql}${offsetSql}`;
        if (setOperators.length > 0) {
          return this.buildSetOperations(finalQuery, setOperators);
        }
        return finalQuery;
      }
      buildSetOperations(leftSelect, setOperators) {
        const [setOperator, ...rest] = setOperators;
        if (!setOperator) {
          throw new Error("Cannot pass undefined values to any set operator");
        }
        if (rest.length === 0) {
          return this.buildSetOperationQuery({ leftSelect, setOperator });
        }
        return this.buildSetOperations(
          this.buildSetOperationQuery({ leftSelect, setOperator }),
          rest
        );
      }
      buildSetOperationQuery({
        leftSelect,
        setOperator: { type, isAll, rightSelect, limit, orderBy, offset }
      }) {
        const leftChunk = sql`${leftSelect.getSQL()} `;
        const rightChunk = sql`${rightSelect.getSQL()}`;
        let orderBySql;
        if (orderBy && orderBy.length > 0) {
          const orderByValues = [];
          for (const singleOrderBy of orderBy) {
            if (is(singleOrderBy, SQLiteColumn)) {
              orderByValues.push(sql.identifier(singleOrderBy.name));
            } else if (is(singleOrderBy, SQL)) {
              for (let i = 0; i < singleOrderBy.queryChunks.length; i++) {
                const chunk = singleOrderBy.queryChunks[i];
                if (is(chunk, SQLiteColumn)) {
                  singleOrderBy.queryChunks[i] = sql.identifier(this.casing.getColumnCasing(chunk));
                }
              }
              orderByValues.push(sql`${singleOrderBy}`);
            } else {
              orderByValues.push(sql`${singleOrderBy}`);
            }
          }
          orderBySql = sql` order by ${sql.join(orderByValues, sql`, `)}`;
        }
        const limitSql = typeof limit === "object" || typeof limit === "number" && limit >= 0 ? sql` limit ${limit}` : void 0;
        const operatorChunk = sql.raw(`${type} ${isAll ? "all " : ""}`);
        const offsetSql = offset ? sql` offset ${offset}` : void 0;
        return sql`${leftChunk}${operatorChunk}${rightChunk}${orderBySql}${limitSql}${offsetSql}`;
      }
      buildInsertQuery({ table, values: valuesOrSelect, onConflict, returning, withList, select }) {
        const valuesSqlList = [];
        const columns = table[Table.Symbol.Columns];
        const colEntries = Object.entries(columns).filter(
          ([_, col]) => !col.shouldDisableInsert()
        );
        const insertOrder = colEntries.map(([, column]) => sql.identifier(this.casing.getColumnCasing(column)));
        if (select) {
          const select2 = valuesOrSelect;
          if (is(select2, SQL)) {
            valuesSqlList.push(select2);
          } else {
            valuesSqlList.push(select2.getSQL());
          }
        } else {
          const values = valuesOrSelect;
          valuesSqlList.push(sql.raw("values "));
          for (const [valueIndex, value] of values.entries()) {
            const valueList = [];
            for (const [fieldName, col] of colEntries) {
              const colValue = value[fieldName];
              if (colValue === void 0 || is(colValue, Param) && colValue.value === void 0) {
                let defaultValue;
                if (col.default !== null && col.default !== void 0) {
                  defaultValue = is(col.default, SQL) ? col.default : sql.param(col.default, col);
                } else if (col.defaultFn !== void 0) {
                  const defaultFnResult = col.defaultFn();
                  defaultValue = is(defaultFnResult, SQL) ? defaultFnResult : sql.param(defaultFnResult, col);
                } else if (!col.default && col.onUpdateFn !== void 0) {
                  const onUpdateFnResult = col.onUpdateFn();
                  defaultValue = is(onUpdateFnResult, SQL) ? onUpdateFnResult : sql.param(onUpdateFnResult, col);
                } else {
                  defaultValue = sql`null`;
                }
                valueList.push(defaultValue);
              } else {
                valueList.push(colValue);
              }
            }
            valuesSqlList.push(valueList);
            if (valueIndex < values.length - 1) {
              valuesSqlList.push(sql`, `);
            }
          }
        }
        const withSql = this.buildWithCTE(withList);
        const valuesSql = sql.join(valuesSqlList);
        const returningSql = returning ? sql` returning ${this.buildSelection(returning, { isSingleTable: true })}` : void 0;
        const onConflictSql = onConflict?.length ? sql.join(onConflict) : void 0;
        return sql`${withSql}insert into ${table} ${insertOrder} ${valuesSql}${onConflictSql}${returningSql}`;
      }
      sqlToQuery(sql2, invokeSource) {
        return sql2.toQuery({
          casing: this.casing,
          escapeName: this.escapeName,
          escapeParam: this.escapeParam,
          escapeString: this.escapeString,
          invokeSource
        });
      }
      buildRelationalQuery({
        fullSchema,
        schema,
        tableNamesMap,
        table,
        tableConfig,
        queryConfig: config,
        tableAlias,
        nestedQueryRelation,
        joinOn
      }) {
        let selection = [];
        let limit, offset, orderBy = [], where;
        const joins = [];
        if (config === true) {
          const selectionEntries = Object.entries(tableConfig.columns);
          selection = selectionEntries.map(([key, value]) => ({
            dbKey: value.name,
            tsKey: key,
            field: aliasedTableColumn(value, tableAlias),
            relationTableTsKey: void 0,
            isJson: false,
            selection: []
          }));
        } else {
          const aliasedColumns = Object.fromEntries(
            Object.entries(tableConfig.columns).map(([key, value]) => [key, aliasedTableColumn(value, tableAlias)])
          );
          if (config.where) {
            const whereSql = typeof config.where === "function" ? config.where(aliasedColumns, getOperators()) : config.where;
            where = whereSql && mapColumnsInSQLToAlias(whereSql, tableAlias);
          }
          const fieldsSelection = [];
          let selectedColumns = [];
          if (config.columns) {
            let isIncludeMode = false;
            for (const [field, value] of Object.entries(config.columns)) {
              if (value === void 0) {
                continue;
              }
              if (field in tableConfig.columns) {
                if (!isIncludeMode && value === true) {
                  isIncludeMode = true;
                }
                selectedColumns.push(field);
              }
            }
            if (selectedColumns.length > 0) {
              selectedColumns = isIncludeMode ? selectedColumns.filter((c) => config.columns?.[c] === true) : Object.keys(tableConfig.columns).filter((key) => !selectedColumns.includes(key));
            }
          } else {
            selectedColumns = Object.keys(tableConfig.columns);
          }
          for (const field of selectedColumns) {
            const column = tableConfig.columns[field];
            fieldsSelection.push({ tsKey: field, value: column });
          }
          let selectedRelations = [];
          if (config.with) {
            selectedRelations = Object.entries(config.with).filter((entry) => !!entry[1]).map(([tsKey, queryConfig]) => ({ tsKey, queryConfig, relation: tableConfig.relations[tsKey] }));
          }
          let extras;
          if (config.extras) {
            extras = typeof config.extras === "function" ? config.extras(aliasedColumns, { sql }) : config.extras;
            for (const [tsKey, value] of Object.entries(extras)) {
              fieldsSelection.push({
                tsKey,
                value: mapColumnsInAliasedSQLToAlias(value, tableAlias)
              });
            }
          }
          for (const { tsKey, value } of fieldsSelection) {
            selection.push({
              dbKey: is(value, SQL.Aliased) ? value.fieldAlias : tableConfig.columns[tsKey].name,
              tsKey,
              field: is(value, Column) ? aliasedTableColumn(value, tableAlias) : value,
              relationTableTsKey: void 0,
              isJson: false,
              selection: []
            });
          }
          let orderByOrig = typeof config.orderBy === "function" ? config.orderBy(aliasedColumns, getOrderByOperators()) : config.orderBy ?? [];
          if (!Array.isArray(orderByOrig)) {
            orderByOrig = [orderByOrig];
          }
          orderBy = orderByOrig.map((orderByValue) => {
            if (is(orderByValue, Column)) {
              return aliasedTableColumn(orderByValue, tableAlias);
            }
            return mapColumnsInSQLToAlias(orderByValue, tableAlias);
          });
          limit = config.limit;
          offset = config.offset;
          for (const {
            tsKey: selectedRelationTsKey,
            queryConfig: selectedRelationConfigValue,
            relation
          } of selectedRelations) {
            const normalizedRelation = normalizeRelation(schema, tableNamesMap, relation);
            const relationTableName = getTableUniqueName(relation.referencedTable);
            const relationTableTsName = tableNamesMap[relationTableName];
            const relationTableAlias = `${tableAlias}_${selectedRelationTsKey}`;
            const joinOn2 = and(
              ...normalizedRelation.fields.map(
                (field2, i) => eq(
                  aliasedTableColumn(normalizedRelation.references[i], relationTableAlias),
                  aliasedTableColumn(field2, tableAlias)
                )
              )
            );
            const builtRelation = this.buildRelationalQuery({
              fullSchema,
              schema,
              tableNamesMap,
              table: fullSchema[relationTableTsName],
              tableConfig: schema[relationTableTsName],
              queryConfig: is(relation, One) ? selectedRelationConfigValue === true ? { limit: 1 } : { ...selectedRelationConfigValue, limit: 1 } : selectedRelationConfigValue,
              tableAlias: relationTableAlias,
              joinOn: joinOn2,
              nestedQueryRelation: relation
            });
            const field = sql`(${builtRelation.sql})`.as(selectedRelationTsKey);
            selection.push({
              dbKey: selectedRelationTsKey,
              tsKey: selectedRelationTsKey,
              field,
              relationTableTsKey: relationTableTsName,
              isJson: true,
              selection: builtRelation.selection
            });
          }
        }
        if (selection.length === 0) {
          throw new DrizzleError({
            message: `No fields selected for table "${tableConfig.tsName}" ("${tableAlias}"). You need to have at least one item in "columns", "with" or "extras". If you need to select all columns, omit the "columns" key or set it to undefined.`
          });
        }
        let result;
        where = and(joinOn, where);
        if (nestedQueryRelation) {
          let field = sql`json_array(${sql.join(
            selection.map(
              ({ field: field2 }) => is(field2, SQLiteColumn) ? sql.identifier(this.casing.getColumnCasing(field2)) : is(field2, SQL.Aliased) ? field2.sql : field2
            ),
            sql`, `
          )})`;
          if (is(nestedQueryRelation, Many)) {
            field = sql`coalesce(json_group_array(${field}), json_array())`;
          }
          const nestedSelection = [{
            dbKey: "data",
            tsKey: "data",
            field: field.as("data"),
            isJson: true,
            relationTableTsKey: tableConfig.tsName,
            selection
          }];
          const needsSubquery = limit !== void 0 || offset !== void 0 || orderBy.length > 0;
          if (needsSubquery) {
            result = this.buildSelectQuery({
              table: aliasedTable(table, tableAlias),
              fields: {},
              fieldsFlat: [
                {
                  path: [],
                  field: sql.raw("*")
                }
              ],
              where,
              limit,
              offset,
              orderBy,
              setOperators: []
            });
            where = void 0;
            limit = void 0;
            offset = void 0;
            orderBy = void 0;
          } else {
            result = aliasedTable(table, tableAlias);
          }
          result = this.buildSelectQuery({
            table: is(result, SQLiteTable) ? result : new Subquery(result, {}, tableAlias),
            fields: {},
            fieldsFlat: nestedSelection.map(({ field: field2 }) => ({
              path: [],
              field: is(field2, Column) ? aliasedTableColumn(field2, tableAlias) : field2
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        } else {
          result = this.buildSelectQuery({
            table: aliasedTable(table, tableAlias),
            fields: {},
            fieldsFlat: selection.map(({ field }) => ({
              path: [],
              field: is(field, Column) ? aliasedTableColumn(field, tableAlias) : field
            })),
            joins,
            where,
            limit,
            offset,
            orderBy,
            setOperators: []
          });
        }
        return {
          tableTsKey: tableConfig.tsName,
          sql: result,
          selection
        };
      }
    }, "SQLiteDialect");
    __name2(SQLiteDialect, "SQLiteDialect");
    _a91 = entityKind;
    __publicField(SQLiteDialect, _a91, "SQLiteDialect");
    SQLiteSyncDialect = /* @__PURE__ */ __name(class extends SQLiteDialect {
      migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        session.run(migrationTableCreate);
        const dbMigrations = session.values(
          sql`SELECT id, hash, created_at FROM ${sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        session.run(sql`BEGIN`);
        try {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                session.run(sql.raw(stmt));
              }
              session.run(
                sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
          session.run(sql`COMMIT`);
        } catch (e) {
          session.run(sql`ROLLBACK`);
          throw e;
        }
      }
    }, "SQLiteSyncDialect");
    __name2(SQLiteSyncDialect, "SQLiteSyncDialect");
    _a92 = entityKind;
    __publicField(SQLiteSyncDialect, _a92, "SQLiteSyncDialect");
    SQLiteAsyncDialect = /* @__PURE__ */ __name(class extends SQLiteDialect {
      async migrate(migrations, session, config) {
        const migrationsTable = config === void 0 ? "__drizzle_migrations" : typeof config === "string" ? "__drizzle_migrations" : config.migrationsTable ?? "__drizzle_migrations";
        const migrationTableCreate = sql`
			CREATE TABLE IF NOT EXISTS ${sql.identifier(migrationsTable)} (
				id SERIAL PRIMARY KEY,
				hash text NOT NULL,
				created_at numeric
			)
		`;
        await session.run(migrationTableCreate);
        const dbMigrations = await session.values(
          sql`SELECT id, hash, created_at FROM ${sql.identifier(migrationsTable)} ORDER BY created_at DESC LIMIT 1`
        );
        const lastDbMigration = dbMigrations[0] ?? void 0;
        await session.transaction(async (tx) => {
          for (const migration of migrations) {
            if (!lastDbMigration || Number(lastDbMigration[2]) < migration.folderMillis) {
              for (const stmt of migration.sql) {
                await tx.run(sql.raw(stmt));
              }
              await tx.run(
                sql`INSERT INTO ${sql.identifier(migrationsTable)} ("hash", "created_at") VALUES(${migration.hash}, ${migration.folderMillis})`
              );
            }
          }
        });
      }
    }, "SQLiteAsyncDialect");
    __name2(SQLiteAsyncDialect, "SQLiteAsyncDialect");
    _a93 = entityKind;
    __publicField(SQLiteAsyncDialect, _a93, "SQLiteAsyncDialect");
  }
});
var _a94;
var TypedQueryBuilder;
var init_query_builder = __esm({
  "../node_modules/drizzle-orm/query-builders/query-builder.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    TypedQueryBuilder = /* @__PURE__ */ __name(class {
      /** @internal */
      getSelectedFields() {
        return this._.selectedFields;
      }
    }, "TypedQueryBuilder");
    __name2(TypedQueryBuilder, "TypedQueryBuilder");
    _a94 = entityKind;
    __publicField(TypedQueryBuilder, _a94, "TypedQueryBuilder");
  }
});
function createSetOperator(type, isAll) {
  return (leftSelect, rightSelect, ...restSelects) => {
    const setOperators = [rightSelect, ...restSelects].map((select) => ({
      type,
      isAll,
      rightSelect: select
    }));
    for (const setOperator of setOperators) {
      if (!haveSameKeys(leftSelect.getSelectedFields(), setOperator.rightSelect.getSelectedFields())) {
        throw new Error(
          "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
        );
      }
    }
    return leftSelect.addSetOperators(setOperators);
  };
}
__name(createSetOperator, "createSetOperator");
var _a95;
var SQLiteSelectBuilder;
var _a96;
var SQLiteSelectQueryBuilderBase;
var _a97;
var SQLiteSelectBase;
var getSQLiteSetOperators;
var union;
var unionAll;
var intersect;
var except;
var init_select2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/select.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_query_builder();
    init_query_promise();
    init_selection_proxy();
    init_sql();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_utils2();
    init_view_base();
    SQLiteSelectBuilder = /* @__PURE__ */ __name(class {
      fields;
      session;
      dialect;
      withList;
      distinct;
      constructor(config) {
        this.fields = config.fields;
        this.session = config.session;
        this.dialect = config.dialect;
        this.withList = config.withList;
        this.distinct = config.distinct;
      }
      from(source) {
        const isPartialSelect = !!this.fields;
        let fields;
        if (this.fields) {
          fields = this.fields;
        } else if (is(source, Subquery)) {
          fields = Object.fromEntries(
            Object.keys(source._.selectedFields).map((key) => [key, source[key]])
          );
        } else if (is(source, SQLiteViewBase)) {
          fields = source[ViewBaseConfig].selectedFields;
        } else if (is(source, SQL)) {
          fields = {};
        } else {
          fields = getTableColumns(source);
        }
        return new SQLiteSelectBase({
          table: source,
          fields,
          isPartialSelect,
          session: this.session,
          dialect: this.dialect,
          withList: this.withList,
          distinct: this.distinct
        });
      }
    }, "SQLiteSelectBuilder");
    __name2(SQLiteSelectBuilder, "SQLiteSelectBuilder");
    _a95 = entityKind;
    __publicField(SQLiteSelectBuilder, _a95, "SQLiteSelectBuilder");
    SQLiteSelectQueryBuilderBase = /* @__PURE__ */ __name(class extends TypedQueryBuilder {
      _;
      /** @internal */
      config;
      joinsNotNullableMap;
      tableName;
      isPartialSelect;
      session;
      dialect;
      cacheConfig = void 0;
      usedTables = /* @__PURE__ */ new Set();
      constructor({ table, fields, isPartialSelect, session, dialect, withList, distinct }) {
        super();
        this.config = {
          withList,
          table,
          fields: { ...fields },
          distinct,
          setOperators: []
        };
        this.isPartialSelect = isPartialSelect;
        this.session = session;
        this.dialect = dialect;
        this._ = {
          selectedFields: fields,
          config: this.config
        };
        this.tableName = getTableLikeName(table);
        this.joinsNotNullableMap = typeof this.tableName === "string" ? { [this.tableName]: true } : {};
        for (const item of extractUsedTable(table))
          this.usedTables.add(item);
      }
      /** @internal */
      getUsedTables() {
        return [...this.usedTables];
      }
      createJoin(joinType) {
        return (table, on) => {
          const baseTableName = this.tableName;
          const tableName = getTableLikeName(table);
          for (const item of extractUsedTable(table))
            this.usedTables.add(item);
          if (typeof tableName === "string" && this.config.joins?.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (!this.isPartialSelect) {
            if (Object.keys(this.joinsNotNullableMap).length === 1 && typeof baseTableName === "string") {
              this.config.fields = {
                [baseTableName]: this.config.fields
              };
            }
            if (typeof tableName === "string" && !is(table, SQL)) {
              const selection = is(table, Subquery) ? table._.selectedFields : is(table, View) ? table[ViewBaseConfig].selectedFields : table[Table.Symbol.Columns];
              this.config.fields[tableName] = selection;
            }
          }
          if (typeof on === "function") {
            on = on(
              new Proxy(
                this.config.fields,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          if (!this.config.joins) {
            this.config.joins = [];
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          if (typeof tableName === "string") {
            switch (joinType) {
              case "left": {
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
              case "right": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "cross":
              case "inner": {
                this.joinsNotNullableMap[tableName] = true;
                break;
              }
              case "full": {
                this.joinsNotNullableMap = Object.fromEntries(
                  Object.entries(this.joinsNotNullableMap).map(([key]) => [key, false])
                );
                this.joinsNotNullableMap[tableName] = false;
                break;
              }
            }
          }
          return this;
        };
      }
      /**
       * Executes a `left join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the table with the corresponding row from the joined table, if a match is found. If no matching row exists, it sets all columns of the joined table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#left-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .leftJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      leftJoin = this.createJoin("left");
      /**
       * Executes a `right join` operation by adding another table to the current query.
       *
       * Calling this method associates each row of the joined table with the corresponding row from the main table, if a match is found. If no matching row exists, it sets all columns of the main table to null.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#right-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .rightJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      rightJoin = this.createJoin("right");
      /**
       * Executes an `inner join` operation, creating a new table by combining rows from two tables that have matching values.
       *
       * Calling this method retrieves rows that have corresponding entries in both joined tables. Rows without matching entries in either table are excluded, resulting in a table that includes only matching pairs.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#inner-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .innerJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      innerJoin = this.createJoin("inner");
      /**
       * Executes a `full join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging rows with matching values and filling in `null` for non-matching columns.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#full-join}
       *
       * @param table the table to join.
       * @param on the `on` clause.
       *
       * @example
       *
       * ```ts
       * // Select all users and their pets
       * const usersWithPets: { user: User | null; pets: Pet | null; }[] = await db.select()
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number | null; petId: number | null; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .fullJoin(pets, eq(users.id, pets.ownerId))
       * ```
       */
      fullJoin = this.createJoin("full");
      /**
       * Executes a `cross join` operation by combining rows from two tables into a new table.
       *
       * Calling this method retrieves all rows from both main and joined tables, merging all rows from each table.
       *
       * See docs: {@link https://orm.drizzle.team/docs/joins#cross-join}
       *
       * @param table the table to join.
       *
       * @example
       *
       * ```ts
       * // Select all users, each user with every pet
       * const usersWithPets: { user: User; pets: Pet; }[] = await db.select()
       *   .from(users)
       *   .crossJoin(pets)
       *
       * // Select userId and petId
       * const usersIdsAndPetIds: { userId: number; petId: number; }[] = await db.select({
       *   userId: users.id,
       *   petId: pets.id,
       * })
       *   .from(users)
       *   .crossJoin(pets)
       * ```
       */
      crossJoin = this.createJoin("cross");
      createSetOperator(type, isAll) {
        return (rightSelection) => {
          const rightSelect = typeof rightSelection === "function" ? rightSelection(getSQLiteSetOperators()) : rightSelection;
          if (!haveSameKeys(this.getSelectedFields(), rightSelect.getSelectedFields())) {
            throw new Error(
              "Set operator error (union / intersect / except): selected fields are not the same or are in a different order"
            );
          }
          this.config.setOperators.push({ type, isAll, rightSelect });
          return this;
        };
      }
      /**
       * Adds `union` set operator to the query.
       *
       * Calling this method will combine the result sets of the `select` statements and remove any duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union}
       *
       * @example
       *
       * ```ts
       * // Select all unique names from customers and users tables
       * await db.select({ name: users.name })
       *   .from(users)
       *   .union(
       *     db.select({ name: customers.name }).from(customers)
       *   );
       * // or
       * import { union } from 'drizzle-orm/sqlite-core'
       *
       * await union(
       *   db.select({ name: users.name }).from(users),
       *   db.select({ name: customers.name }).from(customers)
       * );
       * ```
       */
      union = this.createSetOperator("union", false);
      /**
       * Adds `union all` set operator to the query.
       *
       * Calling this method will combine the result-set of the `select` statements and keep all duplicate rows that appear across them.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#union-all}
       *
       * @example
       *
       * ```ts
       * // Select all transaction ids from both online and in-store sales
       * await db.select({ transaction: onlineSales.transactionId })
       *   .from(onlineSales)
       *   .unionAll(
       *     db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       *   );
       * // or
       * import { unionAll } from 'drizzle-orm/sqlite-core'
       *
       * await unionAll(
       *   db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
       *   db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
       * );
       * ```
       */
      unionAll = this.createSetOperator("union", true);
      /**
       * Adds `intersect` set operator to the query.
       *
       * Calling this method will retain only the rows that are present in both result sets and eliminate duplicates.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#intersect}
       *
       * @example
       *
       * ```ts
       * // Select course names that are offered in both departments A and B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .intersect(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { intersect } from 'drizzle-orm/sqlite-core'
       *
       * await intersect(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      intersect = this.createSetOperator("intersect", false);
      /**
       * Adds `except` set operator to the query.
       *
       * Calling this method will retrieve all unique rows from the left query, except for the rows that are present in the result set of the right query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/set-operations#except}
       *
       * @example
       *
       * ```ts
       * // Select all courses offered in department A but not in department B
       * await db.select({ courseName: depA.courseName })
       *   .from(depA)
       *   .except(
       *     db.select({ courseName: depB.courseName }).from(depB)
       *   );
       * // or
       * import { except } from 'drizzle-orm/sqlite-core'
       *
       * await except(
       *   db.select({ courseName: depA.courseName }).from(depA),
       *   db.select({ courseName: depB.courseName }).from(depB)
       * );
       * ```
       */
      except = this.createSetOperator("except", false);
      /** @internal */
      addSetOperators(setOperators) {
        this.config.setOperators.push(...setOperators);
        return this;
      }
      /**
       * Adds a `where` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#filtering}
       *
       * @param where the `where` clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be selected.
       *
       * ```ts
       * // Select all cars with green color
       * await db.select().from(cars).where(eq(cars.color, 'green'));
       * // or
       * await db.select().from(cars).where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Select all BMW cars with a green color
       * await db.select().from(cars).where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Select all cars with the green or blue color
       * await db.select().from(cars).where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        if (typeof where === "function") {
          where = where(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.where = where;
        return this;
      }
      /**
       * Adds a `having` clause to the query.
       *
       * Calling this method will select only those rows that fulfill a specified condition. It is typically used with aggregate functions to filter the aggregated data based on a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#aggregations}
       *
       * @param having the `having` clause.
       *
       * @example
       *
       * ```ts
       * // Select all brands with more than one car
       * await db.select({
       * 	brand: cars.brand,
       * 	count: sql<number>`cast(count(${cars.id}) as int)`,
       * })
       *   .from(cars)
       *   .groupBy(cars.brand)
       *   .having(({ count }) => gt(count, 1));
       * ```
       */
      having(having) {
        if (typeof having === "function") {
          having = having(
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
            )
          );
        }
        this.config.having = having;
        return this;
      }
      groupBy(...columns) {
        if (typeof columns[0] === "function") {
          const groupBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          this.config.groupBy = Array.isArray(groupBy) ? groupBy : [groupBy];
        } else {
          this.config.groupBy = columns;
        }
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.fields,
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        } else {
          const orderByArray = columns;
          if (this.config.setOperators.length > 0) {
            this.config.setOperators.at(-1).orderBy = orderByArray;
          } else {
            this.config.orderBy = orderByArray;
          }
        }
        return this;
      }
      /**
       * Adds a `limit` clause to the query.
       *
       * Calling this method will set the maximum number of rows that will be returned by this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param limit the `limit` clause.
       *
       * @example
       *
       * ```ts
       * // Get the first 10 people from this query.
       * await db.select().from(people).limit(10);
       * ```
       */
      limit(limit) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).limit = limit;
        } else {
          this.config.limit = limit;
        }
        return this;
      }
      /**
       * Adds an `offset` clause to the query.
       *
       * Calling this method will skip a number of rows when returning results from this query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#limit--offset}
       *
       * @param offset the `offset` clause.
       *
       * @example
       *
       * ```ts
       * // Get the 10th-20th people from this query.
       * await db.select().from(people).offset(10).limit(10);
       * ```
       */
      offset(offset) {
        if (this.config.setOperators.length > 0) {
          this.config.setOperators.at(-1).offset = offset;
        } else {
          this.config.offset = offset;
        }
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildSelectQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      as(alias) {
        const usedTables = [];
        usedTables.push(...extractUsedTable(this.config.table));
        if (this.config.joins) {
          for (const it of this.config.joins)
            usedTables.push(...extractUsedTable(it.table));
        }
        return new Proxy(
          new Subquery(this.getSQL(), this.config.fields, alias, false, [...new Set(usedTables)]),
          new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      /** @internal */
      getSelectedFields() {
        return new Proxy(
          this.config.fields,
          new SelectionProxyHandler({ alias: this.tableName, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
        );
      }
      $dynamic() {
        return this;
      }
    }, "SQLiteSelectQueryBuilderBase");
    __name2(SQLiteSelectQueryBuilderBase, "SQLiteSelectQueryBuilderBase");
    _a96 = entityKind;
    __publicField(SQLiteSelectQueryBuilderBase, _a96, "SQLiteSelectQueryBuilder");
    SQLiteSelectBase = /* @__PURE__ */ __name(class extends SQLiteSelectQueryBuilderBase {
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        if (!this.session) {
          throw new Error("Cannot execute a query on a query builder. Please use a database instance instead.");
        }
        const fieldsList = orderSelectedFields(this.config.fields);
        const query = this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          fieldsList,
          "all",
          true,
          void 0,
          {
            type: "select",
            tables: [...this.usedTables]
          },
          this.cacheConfig
        );
        query.joinsNotNullableMap = this.joinsNotNullableMap;
        return query;
      }
      $withCache(config) {
        this.cacheConfig = config === void 0 ? { config: {}, enable: true, autoInvalidate: true } : config === false ? { enable: false } : { enable: true, autoInvalidate: true, ...config };
        return this;
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.all();
      }
    }, "SQLiteSelectBase");
    __name2(SQLiteSelectBase, "SQLiteSelectBase");
    _a97 = entityKind;
    __publicField(SQLiteSelectBase, _a97, "SQLiteSelect");
    applyMixins(SQLiteSelectBase, [QueryPromise]);
    __name2(createSetOperator, "createSetOperator");
    getSQLiteSetOperators = /* @__PURE__ */ __name2(() => ({
      union,
      unionAll,
      intersect,
      except
    }), "getSQLiteSetOperators");
    union = createSetOperator("union", false);
    unionAll = createSetOperator("union", true);
    intersect = createSetOperator("intersect", false);
    except = createSetOperator("except", false);
  }
});
var _a98;
var QueryBuilder;
var init_query_builder2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/query-builder.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_selection_proxy();
    init_dialect();
    init_subquery();
    init_select2();
    QueryBuilder = /* @__PURE__ */ __name(class {
      dialect;
      dialectConfig;
      constructor(dialect) {
        this.dialect = is(dialect, SQLiteDialect) ? dialect : void 0;
        this.dialectConfig = is(dialect, SQLiteDialect) ? void 0 : dialect;
      }
      $with = (alias, selection) => {
        const queryBuilder = this;
        const as = /* @__PURE__ */ __name2((qb) => {
          if (typeof qb === "function") {
            qb = qb(queryBuilder);
          }
          return new Proxy(
            new WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        }, "as");
        return { as };
      };
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries
          });
        }
        __name(select, "select");
        __name2(select, "select");
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: void 0,
            dialect: self.getDialect(),
            withList: queries,
            distinct: true
          });
        }
        __name(selectDistinct, "selectDistinct");
        __name2(selectDistinct, "selectDistinct");
        return { select, selectDistinct };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: void 0, dialect: this.getDialect() });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: void 0,
          dialect: this.getDialect(),
          distinct: true
        });
      }
      // Lazy load dialect to avoid circular dependency
      getDialect() {
        if (!this.dialect) {
          this.dialect = new SQLiteSyncDialect(this.dialectConfig);
        }
        return this.dialect;
      }
    }, "QueryBuilder");
    __name2(QueryBuilder, "QueryBuilder");
    _a98 = entityKind;
    __publicField(QueryBuilder, _a98, "SQLiteQueryBuilder");
  }
});
var _a99;
var SQLiteInsertBuilder;
var _a100;
var SQLiteInsertBase;
var init_insert = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/insert.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_query_promise();
    init_sql();
    init_table3();
    init_table();
    init_utils();
    init_utils2();
    init_query_builder2();
    SQLiteInsertBuilder = /* @__PURE__ */ __name(class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      values(values) {
        values = Array.isArray(values) ? values : [values];
        if (values.length === 0) {
          throw new Error("values() must be called with at least one value");
        }
        const mappedValues = values.map((entry) => {
          const result = {};
          const cols = this.table[Table.Symbol.Columns];
          for (const colKey of Object.keys(entry)) {
            const colValue = entry[colKey];
            result[colKey] = is(colValue, SQL) ? colValue : new Param(colValue, cols[colKey]);
          }
          return result;
        });
        return new SQLiteInsertBase(this.table, mappedValues, this.session, this.dialect, this.withList);
      }
      select(selectQuery) {
        const select = typeof selectQuery === "function" ? selectQuery(new QueryBuilder()) : selectQuery;
        if (!is(select, SQL) && !haveSameKeys(this.table[Columns], select._.selectedFields)) {
          throw new Error(
            "Insert select error: selected fields are not the same or are in a different order compared to the table definition"
          );
        }
        return new SQLiteInsertBase(this.table, select, this.session, this.dialect, this.withList, true);
      }
    }, "SQLiteInsertBuilder");
    __name2(SQLiteInsertBuilder, "SQLiteInsertBuilder");
    _a99 = entityKind;
    __publicField(SQLiteInsertBuilder, _a99, "SQLiteInsertBuilder");
    SQLiteInsertBase = /* @__PURE__ */ __name(class extends QueryPromise {
      constructor(table, values, session, dialect, withList, select) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { table, values, withList, select };
      }
      /** @internal */
      config;
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /**
       * Adds an `on conflict do nothing` clause to the query.
       *
       * Calling this method simply avoids inserting a row as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#on-conflict-do-nothing}
       *
       * @param config The `target` and `where` clauses.
       *
       * @example
       * ```ts
       * // Insert one row and cancel the insert if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing();
       *
       * // Explicitly specify conflict target
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoNothing({ target: cars.id });
       * ```
       */
      onConflictDoNothing(config = {}) {
        if (!this.config.onConflict)
          this.config.onConflict = [];
        if (config.target === void 0) {
          this.config.onConflict.push(sql` on conflict do nothing`);
        } else {
          const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
          const whereSql = config.where ? sql` where ${config.where}` : sql``;
          this.config.onConflict.push(sql` on conflict ${targetSql} do nothing${whereSql}`);
        }
        return this;
      }
      /**
       * Adds an `on conflict do update` clause to the query.
       *
       * Calling this method will update the existing row that conflicts with the row proposed for insertion as its alternative action.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert#upserts-and-conflicts}
       *
       * @param config The `target`, `set` and `where` clauses.
       *
       * @example
       * ```ts
       * // Update the row if there's a conflict
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'Porsche' }
       *   });
       *
       * // Upsert with 'where' clause
       * await db.insert(cars)
       *   .values({ id: 1, brand: 'BMW' })
       *   .onConflictDoUpdate({
       *     target: cars.id,
       *     set: { brand: 'newBMW' },
       *     where: sql`${cars.createdAt} > '2023-01-01'::date`,
       *   });
       * ```
       */
      onConflictDoUpdate(config) {
        if (config.where && (config.targetWhere || config.setWhere)) {
          throw new Error(
            'You cannot use both "where" and "targetWhere"/"setWhere" at the same time - "where" is deprecated, use "targetWhere" or "setWhere" instead.'
          );
        }
        if (!this.config.onConflict)
          this.config.onConflict = [];
        const whereSql = config.where ? sql` where ${config.where}` : void 0;
        const targetWhereSql = config.targetWhere ? sql` where ${config.targetWhere}` : void 0;
        const setWhereSql = config.setWhere ? sql` where ${config.setWhere}` : void 0;
        const targetSql = Array.isArray(config.target) ? sql`${config.target}` : sql`${[config.target]}`;
        const setSql = this.dialect.buildUpdateSet(this.config.table, mapUpdateSet(this.config.table, config.set));
        this.config.onConflict.push(
          sql` on conflict ${targetSql}${targetWhereSql} do update set ${setSql}${whereSql}${setWhereSql}`
        );
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildInsertQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "insert",
            tables: extractUsedTable(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    }, "SQLiteInsertBase");
    __name2(SQLiteInsertBase, "SQLiteInsertBase");
    _a100 = entityKind;
    __publicField(SQLiteInsertBase, _a100, "SQLiteInsert");
  }
});
var init_select_types = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/select.types.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
  }
});
var _a101;
var SQLiteUpdateBuilder;
var _a102;
var SQLiteUpdateBase;
var init_update = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/update.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_query_promise();
    init_selection_proxy();
    init_table3();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
    init_utils2();
    init_view_base();
    SQLiteUpdateBuilder = /* @__PURE__ */ __name(class {
      constructor(table, session, dialect, withList) {
        this.table = table;
        this.session = session;
        this.dialect = dialect;
        this.withList = withList;
      }
      set(values) {
        return new SQLiteUpdateBase(
          this.table,
          mapUpdateSet(this.table, values),
          this.session,
          this.dialect,
          this.withList
        );
      }
    }, "SQLiteUpdateBuilder");
    __name2(SQLiteUpdateBuilder, "SQLiteUpdateBuilder");
    _a101 = entityKind;
    __publicField(SQLiteUpdateBuilder, _a101, "SQLiteUpdateBuilder");
    SQLiteUpdateBase = /* @__PURE__ */ __name(class extends QueryPromise {
      constructor(table, set, session, dialect, withList) {
        super();
        this.session = session;
        this.dialect = dialect;
        this.config = { set, table, withList, joins: [] };
      }
      /** @internal */
      config;
      from(source) {
        this.config.from = source;
        return this;
      }
      createJoin(joinType) {
        return (table, on) => {
          const tableName = getTableLikeName(table);
          if (typeof tableName === "string" && this.config.joins.some((join) => join.alias === tableName)) {
            throw new Error(`Alias "${tableName}" is already used in this query`);
          }
          if (typeof on === "function") {
            const from = this.config.from ? is(table, SQLiteTable) ? table[Table.Symbol.Columns] : is(table, Subquery) ? table._.selectedFields : is(table, SQLiteViewBase) ? table[ViewBaseConfig].selectedFields : void 0 : void 0;
            on = on(
              new Proxy(
                this.config.table[Table.Symbol.Columns],
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              ),
              from && new Proxy(
                from,
                new SelectionProxyHandler({ sqlAliasedBehavior: "sql", sqlBehavior: "sql" })
              )
            );
          }
          this.config.joins.push({ on, table, joinType, alias: tableName });
          return this;
        };
      }
      leftJoin = this.createJoin("left");
      rightJoin = this.createJoin("right");
      innerJoin = this.createJoin("inner");
      fullJoin = this.createJoin("full");
      /**
       * Adds a 'where' clause to the query.
       *
       * Calling this method will update only those rows that fulfill a specified condition.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param where the 'where' clause.
       *
       * @example
       * You can use conditional operators and `sql function` to filter the rows to be updated.
       *
       * ```ts
       * // Update all cars with green color
       * db.update(cars).set({ color: 'red' })
       *   .where(eq(cars.color, 'green'));
       * // or
       * db.update(cars).set({ color: 'red' })
       *   .where(sql`${cars.color} = 'green'`)
       * ```
       *
       * You can logically combine conditional operators with `and()` and `or()` operators:
       *
       * ```ts
       * // Update all BMW cars with a green color
       * db.update(cars).set({ color: 'red' })
       *   .where(and(eq(cars.color, 'green'), eq(cars.brand, 'BMW')));
       *
       * // Update all cars with the green or blue color
       * db.update(cars).set({ color: 'red' })
       *   .where(or(eq(cars.color, 'green'), eq(cars.color, 'blue')));
       * ```
       */
      where(where) {
        this.config.where = where;
        return this;
      }
      orderBy(...columns) {
        if (typeof columns[0] === "function") {
          const orderBy = columns[0](
            new Proxy(
              this.config.table[Table.Symbol.Columns],
              new SelectionProxyHandler({ sqlAliasedBehavior: "alias", sqlBehavior: "sql" })
            )
          );
          const orderByArray = Array.isArray(orderBy) ? orderBy : [orderBy];
          this.config.orderBy = orderByArray;
        } else {
          const orderByArray = columns;
          this.config.orderBy = orderByArray;
        }
        return this;
      }
      limit(limit) {
        this.config.limit = limit;
        return this;
      }
      returning(fields = this.config.table[SQLiteTable.Symbol.Columns]) {
        this.config.returning = orderSelectedFields(fields);
        return this;
      }
      /** @internal */
      getSQL() {
        return this.dialect.buildUpdateQuery(this.config);
      }
      toSQL() {
        const { typings: _typings, ...rest } = this.dialect.sqlToQuery(this.getSQL());
        return rest;
      }
      /** @internal */
      _prepare(isOneTimeQuery = true) {
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          this.dialect.sqlToQuery(this.getSQL()),
          this.config.returning,
          this.config.returning ? "all" : "run",
          true,
          void 0,
          {
            type: "insert",
            tables: extractUsedTable(this.config.table)
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      run = (placeholderValues) => {
        return this._prepare().run(placeholderValues);
      };
      all = (placeholderValues) => {
        return this._prepare().all(placeholderValues);
      };
      get = (placeholderValues) => {
        return this._prepare().get(placeholderValues);
      };
      values = (placeholderValues) => {
        return this._prepare().values(placeholderValues);
      };
      async execute() {
        return this.config.returning ? this.all() : this.run();
      }
      $dynamic() {
        return this;
      }
    }, "SQLiteUpdateBase");
    __name2(SQLiteUpdateBase, "SQLiteUpdateBase");
    _a102 = entityKind;
    __publicField(SQLiteUpdateBase, _a102, "SQLiteUpdate");
  }
});
var init_query_builders = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_delete();
    init_insert();
    init_query_builder2();
    init_select2();
    init_select_types();
    init_update();
  }
});
var _a103;
var _SQLiteCountBuilder;
var SQLiteCountBuilder;
var init_count = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/count.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_sql();
    _SQLiteCountBuilder = /* @__PURE__ */ __name(class extends SQL {
      constructor(params) {
        super(_SQLiteCountBuilder.buildEmbeddedCount(params.source, params.filters).queryChunks);
        this.params = params;
        this.session = params.session;
        this.sql = _SQLiteCountBuilder.buildCount(
          params.source,
          params.filters
        );
      }
      sql;
      [(_a103 = entityKind, Symbol.toStringTag)] = "SQLiteCountBuilderAsync";
      session;
      static buildEmbeddedCount(source, filters) {
        return sql`(select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters})`;
      }
      static buildCount(source, filters) {
        return sql`select count(*) from ${source}${sql.raw(" where ").if(filters)}${filters}`;
      }
      then(onfulfilled, onrejected) {
        return Promise.resolve(this.session.count(this.sql)).then(
          onfulfilled,
          onrejected
        );
      }
      catch(onRejected) {
        return this.then(void 0, onRejected);
      }
      finally(onFinally) {
        return this.then(
          (value) => {
            onFinally?.();
            return value;
          },
          (reason) => {
            onFinally?.();
            throw reason;
          }
        );
      }
    }, "_SQLiteCountBuilder");
    SQLiteCountBuilder = _SQLiteCountBuilder;
    __name2(SQLiteCountBuilder, "SQLiteCountBuilder");
    __publicField(SQLiteCountBuilder, _a103, "SQLiteCountBuilderAsync");
  }
});
var _a104;
var RelationalQueryBuilder;
var _a105;
var SQLiteRelationalQuery;
var _a106;
var SQLiteSyncRelationalQuery;
var init_query = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/query.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_query_promise();
    init_relations();
    RelationalQueryBuilder = /* @__PURE__ */ __name(class {
      constructor(mode, fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session) {
        this.mode = mode;
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
      }
      findMany(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? config : {},
          "many"
        );
      }
      findFirst(config) {
        return this.mode === "sync" ? new SQLiteSyncRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        ) : new SQLiteRelationalQuery(
          this.fullSchema,
          this.schema,
          this.tableNamesMap,
          this.table,
          this.tableConfig,
          this.dialect,
          this.session,
          config ? { ...config, limit: 1 } : { limit: 1 },
          "first"
        );
      }
    }, "RelationalQueryBuilder");
    __name2(RelationalQueryBuilder, "RelationalQueryBuilder");
    _a104 = entityKind;
    __publicField(RelationalQueryBuilder, _a104, "SQLiteAsyncRelationalQueryBuilder");
    SQLiteRelationalQuery = /* @__PURE__ */ __name(class extends QueryPromise {
      constructor(fullSchema, schema, tableNamesMap, table, tableConfig, dialect, session, config, mode) {
        super();
        this.fullSchema = fullSchema;
        this.schema = schema;
        this.tableNamesMap = tableNamesMap;
        this.table = table;
        this.tableConfig = tableConfig;
        this.dialect = dialect;
        this.session = session;
        this.config = config;
        this.mode = mode;
      }
      /** @internal */
      mode;
      /** @internal */
      getSQL() {
        return this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        }).sql;
      }
      /** @internal */
      _prepare(isOneTimeQuery = false) {
        const { query, builtQuery } = this._toSQL();
        return this.session[isOneTimeQuery ? "prepareOneTimeQuery" : "prepareQuery"](
          builtQuery,
          void 0,
          this.mode === "first" ? "get" : "all",
          true,
          (rawRows, mapColumnValue) => {
            const rows = rawRows.map(
              (row) => mapRelationalRow(this.schema, this.tableConfig, row, query.selection, mapColumnValue)
            );
            if (this.mode === "first") {
              return rows[0];
            }
            return rows;
          }
        );
      }
      prepare() {
        return this._prepare(false);
      }
      _toSQL() {
        const query = this.dialect.buildRelationalQuery({
          fullSchema: this.fullSchema,
          schema: this.schema,
          tableNamesMap: this.tableNamesMap,
          table: this.table,
          tableConfig: this.tableConfig,
          queryConfig: this.config,
          tableAlias: this.tableConfig.tsName
        });
        const builtQuery = this.dialect.sqlToQuery(query.sql);
        return { query, builtQuery };
      }
      toSQL() {
        return this._toSQL().builtQuery;
      }
      /** @internal */
      executeRaw() {
        if (this.mode === "first") {
          return this._prepare(false).get();
        }
        return this._prepare(false).all();
      }
      async execute() {
        return this.executeRaw();
      }
    }, "SQLiteRelationalQuery");
    __name2(SQLiteRelationalQuery, "SQLiteRelationalQuery");
    _a105 = entityKind;
    __publicField(SQLiteRelationalQuery, _a105, "SQLiteAsyncRelationalQuery");
    SQLiteSyncRelationalQuery = /* @__PURE__ */ __name(class extends SQLiteRelationalQuery {
      sync() {
        return this.executeRaw();
      }
    }, "SQLiteSyncRelationalQuery");
    __name2(SQLiteSyncRelationalQuery, "SQLiteSyncRelationalQuery");
    _a106 = entityKind;
    __publicField(SQLiteSyncRelationalQuery, _a106, "SQLiteSyncRelationalQuery");
  }
});
var _a107;
var SQLiteRaw;
var init_raw = __esm({
  "../node_modules/drizzle-orm/sqlite-core/query-builders/raw.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_query_promise();
    SQLiteRaw = /* @__PURE__ */ __name(class extends QueryPromise {
      constructor(execute, getSQL, action, dialect, mapBatchResult) {
        super();
        this.execute = execute;
        this.getSQL = getSQL;
        this.dialect = dialect;
        this.mapBatchResult = mapBatchResult;
        this.config = { action };
      }
      /** @internal */
      config;
      getQuery() {
        return { ...this.dialect.sqlToQuery(this.getSQL()), method: this.config.action };
      }
      mapResult(result, isFromBatch) {
        return isFromBatch ? this.mapBatchResult(result) : result;
      }
      _prepare() {
        return this;
      }
      /** @internal */
      isResponseInArrayMode() {
        return false;
      }
    }, "SQLiteRaw");
    __name2(SQLiteRaw, "SQLiteRaw");
    _a107 = entityKind;
    __publicField(SQLiteRaw, _a107, "SQLiteRaw");
  }
});
var _a108;
var BaseSQLiteDatabase;
var init_db = __esm({
  "../node_modules/drizzle-orm/sqlite-core/db.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_selection_proxy();
    init_sql();
    init_query_builders();
    init_subquery();
    init_count();
    init_query();
    init_raw();
    BaseSQLiteDatabase = /* @__PURE__ */ __name(class {
      constructor(resultKind, dialect, session, schema) {
        this.resultKind = resultKind;
        this.dialect = dialect;
        this.session = session;
        this._ = schema ? {
          schema: schema.schema,
          fullSchema: schema.fullSchema,
          tableNamesMap: schema.tableNamesMap
        } : {
          schema: void 0,
          fullSchema: {},
          tableNamesMap: {}
        };
        this.query = {};
        const query = this.query;
        if (this._.schema) {
          for (const [tableName, columns] of Object.entries(this._.schema)) {
            query[tableName] = new RelationalQueryBuilder(
              resultKind,
              schema.fullSchema,
              this._.schema,
              this._.tableNamesMap,
              schema.fullSchema[tableName],
              columns,
              dialect,
              session
            );
          }
        }
        this.$cache = { invalidate: async (_params) => {
        } };
      }
      query;
      /**
       * Creates a subquery that defines a temporary named result set as a CTE.
       *
       * It is useful for breaking down complex queries into simpler parts and for reusing the result set in subsequent parts of the query.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param alias The alias for the subquery.
       *
       * Failure to provide an alias will result in a DrizzleTypeError, preventing the subquery from being referenced in other queries.
       *
       * @example
       *
       * ```ts
       * // Create a subquery with alias 'sq' and use it in the select query
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * const result = await db.with(sq).select().from(sq);
       * ```
       *
       * To select arbitrary SQL values as fields in a CTE and reference them in other CTEs or in the main query, you need to add aliases to them:
       *
       * ```ts
       * // Select an arbitrary SQL value as a field in a CTE and reference it in the main query
       * const sq = db.$with('sq').as(db.select({
       *   name: sql<string>`upper(${users.name})`.as('name'),
       * })
       * .from(users));
       *
       * const result = await db.with(sq).select({ name: sq.name }).from(sq);
       * ```
       */
      $with = (alias, selection) => {
        const self = this;
        const as = /* @__PURE__ */ __name2((qb) => {
          if (typeof qb === "function") {
            qb = qb(new QueryBuilder(self.dialect));
          }
          return new Proxy(
            new WithSubquery(
              qb.getSQL(),
              selection ?? ("getSelectedFields" in qb ? qb.getSelectedFields() ?? {} : {}),
              alias,
              true
            ),
            new SelectionProxyHandler({ alias, sqlAliasedBehavior: "alias", sqlBehavior: "error" })
          );
        }, "as");
        return { as };
      };
      $count(source, filters) {
        return new SQLiteCountBuilder({ source, filters, session: this.session });
      }
      /**
       * Incorporates a previously defined CTE (using `$with`) into the main query.
       *
       * This method allows the main query to reference a temporary named result set.
       *
       * See docs: {@link https://orm.drizzle.team/docs/select#with-clause}
       *
       * @param queries The CTEs to incorporate into the main query.
       *
       * @example
       *
       * ```ts
       * // Define a subquery 'sq' as a CTE using $with
       * const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
       *
       * // Incorporate the CTE 'sq' into the main query and select from it
       * const result = await db.with(sq).select().from(sq);
       * ```
       */
      with(...queries) {
        const self = this;
        function select(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries
          });
        }
        __name(select, "select");
        __name2(select, "select");
        function selectDistinct(fields) {
          return new SQLiteSelectBuilder({
            fields: fields ?? void 0,
            session: self.session,
            dialect: self.dialect,
            withList: queries,
            distinct: true
          });
        }
        __name(selectDistinct, "selectDistinct");
        __name2(selectDistinct, "selectDistinct");
        function update(table) {
          return new SQLiteUpdateBuilder(table, self.session, self.dialect, queries);
        }
        __name(update, "update");
        __name2(update, "update");
        function insert(into) {
          return new SQLiteInsertBuilder(into, self.session, self.dialect, queries);
        }
        __name(insert, "insert");
        __name2(insert, "insert");
        function delete_(from) {
          return new SQLiteDeleteBase(from, self.session, self.dialect, queries);
        }
        __name(delete_, "delete_");
        __name2(delete_, "delete_");
        return { select, selectDistinct, update, insert, delete: delete_ };
      }
      select(fields) {
        return new SQLiteSelectBuilder({ fields: fields ?? void 0, session: this.session, dialect: this.dialect });
      }
      selectDistinct(fields) {
        return new SQLiteSelectBuilder({
          fields: fields ?? void 0,
          session: this.session,
          dialect: this.dialect,
          distinct: true
        });
      }
      /**
       * Creates an update query.
       *
       * Calling this method without `.where()` clause will update all rows in a table. The `.where()` clause specifies which rows should be updated.
       *
       * Use `.set()` method to specify which values to update.
       *
       * See docs: {@link https://orm.drizzle.team/docs/update}
       *
       * @param table The table to update.
       *
       * @example
       *
       * ```ts
       * // Update all rows in the 'cars' table
       * await db.update(cars).set({ color: 'red' });
       *
       * // Update rows with filters and conditions
       * await db.update(cars).set({ color: 'red' }).where(eq(cars.brand, 'BMW'));
       *
       * // Update with returning clause
       * const updatedCar: Car[] = await db.update(cars)
       *   .set({ color: 'red' })
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      update(table) {
        return new SQLiteUpdateBuilder(table, this.session, this.dialect);
      }
      $cache;
      /**
       * Creates an insert query.
       *
       * Calling this method will create new rows in a table. Use `.values()` method to specify which values to insert.
       *
       * See docs: {@link https://orm.drizzle.team/docs/insert}
       *
       * @param table The table to insert into.
       *
       * @example
       *
       * ```ts
       * // Insert one row
       * await db.insert(cars).values({ brand: 'BMW' });
       *
       * // Insert multiple rows
       * await db.insert(cars).values([{ brand: 'BMW' }, { brand: 'Porsche' }]);
       *
       * // Insert with returning clause
       * const insertedCar: Car[] = await db.insert(cars)
       *   .values({ brand: 'BMW' })
       *   .returning();
       * ```
       */
      insert(into) {
        return new SQLiteInsertBuilder(into, this.session, this.dialect);
      }
      /**
       * Creates a delete query.
       *
       * Calling this method without `.where()` clause will delete all rows in a table. The `.where()` clause specifies which rows should be deleted.
       *
       * See docs: {@link https://orm.drizzle.team/docs/delete}
       *
       * @param table The table to delete from.
       *
       * @example
       *
       * ```ts
       * // Delete all rows in the 'cars' table
       * await db.delete(cars);
       *
       * // Delete rows with filters and conditions
       * await db.delete(cars).where(eq(cars.color, 'green'));
       *
       * // Delete with returning clause
       * const deletedCar: Car[] = await db.delete(cars)
       *   .where(eq(cars.id, 1))
       *   .returning();
       * ```
       */
      delete(from) {
        return new SQLiteDeleteBase(from, this.session, this.dialect);
      }
      run(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.run(sequel),
            () => sequel,
            "run",
            this.dialect,
            this.session.extractRawRunValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.run(sequel);
      }
      all(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.all(sequel),
            () => sequel,
            "all",
            this.dialect,
            this.session.extractRawAllValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.all(sequel);
      }
      get(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.get(sequel),
            () => sequel,
            "get",
            this.dialect,
            this.session.extractRawGetValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.get(sequel);
      }
      values(query) {
        const sequel = typeof query === "string" ? sql.raw(query) : query.getSQL();
        if (this.resultKind === "async") {
          return new SQLiteRaw(
            async () => this.session.values(sequel),
            () => sequel,
            "values",
            this.dialect,
            this.session.extractRawValuesValueFromBatchResult.bind(this.session)
          );
        }
        return this.session.values(sequel);
      }
      transaction(transaction, config) {
        return this.session.transaction(transaction, config);
      }
    }, "BaseSQLiteDatabase");
    __name2(BaseSQLiteDatabase, "BaseSQLiteDatabase");
    _a108 = entityKind;
    __publicField(BaseSQLiteDatabase, _a108, "BaseSQLiteDatabase");
  }
});
async function hashQuery(sql2, params) {
  const dataToHash = `${sql2}-${JSON.stringify(params)}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(dataToHash);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = [...new Uint8Array(hashBuffer)];
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
  return hashHex;
}
__name(hashQuery, "hashQuery");
var _a109;
var Cache;
var _a110;
var NoopCache;
var init_cache = __esm({
  "../node_modules/drizzle-orm/cache/core/cache.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    Cache = /* @__PURE__ */ __name(class {
    }, "Cache");
    __name2(Cache, "Cache");
    _a109 = entityKind;
    __publicField(Cache, _a109, "Cache");
    NoopCache = /* @__PURE__ */ __name(class extends Cache {
      strategy() {
        return "all";
      }
      async get(_key) {
        return void 0;
      }
      async put(_hashedQuery, _response, _tables, _config) {
      }
      async onMutate(_params) {
      }
    }, "NoopCache");
    __name2(NoopCache, "NoopCache");
    _a110 = entityKind;
    __publicField(NoopCache, _a110, "NoopCache");
    __name2(hashQuery, "hashQuery");
  }
});
var init_core = __esm({
  "../node_modules/drizzle-orm/cache/core/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_cache();
  }
});
var init_alias2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/alias.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
  }
});
var DrizzleQueryError;
var init_errors2 = __esm({
  "../node_modules/drizzle-orm/errors/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    DrizzleQueryError = /* @__PURE__ */ __name(class extends Error {
      constructor(query, params, cause) {
        super(`Failed query: ${query}
params: ${params}`);
        this.query = query;
        this.params = params;
        this.cause = cause;
        Error.captureStackTrace(this, DrizzleQueryError);
        if (cause)
          this.cause = cause;
      }
    }, "DrizzleQueryError");
    __name2(DrizzleQueryError, "DrizzleQueryError");
  }
});
var _a111;
var ExecuteResultSync;
var _a112;
var SQLitePreparedQuery;
var _a113;
var SQLiteSession;
var _a114;
var SQLiteTransaction;
var init_session = __esm({
  "../node_modules/drizzle-orm/sqlite-core/session.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_cache();
    init_entity();
    init_errors();
    init_errors2();
    init_query_promise();
    init_db();
    ExecuteResultSync = /* @__PURE__ */ __name(class extends QueryPromise {
      constructor(resultCb) {
        super();
        this.resultCb = resultCb;
      }
      async execute() {
        return this.resultCb();
      }
      sync() {
        return this.resultCb();
      }
    }, "ExecuteResultSync");
    __name2(ExecuteResultSync, "ExecuteResultSync");
    _a111 = entityKind;
    __publicField(ExecuteResultSync, _a111, "ExecuteResultSync");
    SQLitePreparedQuery = /* @__PURE__ */ __name(class {
      constructor(mode, executeMethod, query, cache, queryMetadata, cacheConfig) {
        this.mode = mode;
        this.executeMethod = executeMethod;
        this.query = query;
        this.cache = cache;
        this.queryMetadata = queryMetadata;
        this.cacheConfig = cacheConfig;
        if (cache && cache.strategy() === "all" && cacheConfig === void 0) {
          this.cacheConfig = { enable: true, autoInvalidate: true };
        }
        if (!this.cacheConfig?.enable) {
          this.cacheConfig = void 0;
        }
      }
      /** @internal */
      joinsNotNullableMap;
      /** @internal */
      async queryWithCache(queryString, params, query) {
        if (this.cache === void 0 || is(this.cache, NoopCache) || this.queryMetadata === void 0) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.cacheConfig && !this.cacheConfig.enable) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if ((this.queryMetadata.type === "insert" || this.queryMetadata.type === "update" || this.queryMetadata.type === "delete") && this.queryMetadata.tables.length > 0) {
          try {
            const [res] = await Promise.all([
              query(),
              this.cache.onMutate({ tables: this.queryMetadata.tables })
            ]);
            return res;
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (!this.cacheConfig) {
          try {
            return await query();
          } catch (e) {
            throw new DrizzleQueryError(queryString, params, e);
          }
        }
        if (this.queryMetadata.type === "select") {
          const fromCache = await this.cache.get(
            this.cacheConfig.tag ?? await hashQuery(queryString, params),
            this.queryMetadata.tables,
            this.cacheConfig.tag !== void 0,
            this.cacheConfig.autoInvalidate
          );
          if (fromCache === void 0) {
            let result;
            try {
              result = await query();
            } catch (e) {
              throw new DrizzleQueryError(queryString, params, e);
            }
            await this.cache.put(
              this.cacheConfig.tag ?? await hashQuery(queryString, params),
              result,
              // make sure we send tables that were used in a query only if user wants to invalidate it on each write
              this.cacheConfig.autoInvalidate ? this.queryMetadata.tables : [],
              this.cacheConfig.tag !== void 0,
              this.cacheConfig.config
            );
            return result;
          }
          return fromCache;
        }
        try {
          return await query();
        } catch (e) {
          throw new DrizzleQueryError(queryString, params, e);
        }
      }
      getQuery() {
        return this.query;
      }
      mapRunResult(result, _isFromBatch) {
        return result;
      }
      mapAllResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      mapGetResult(_result, _isFromBatch) {
        throw new Error("Not implemented");
      }
      execute(placeholderValues) {
        if (this.mode === "async") {
          return this[this.executeMethod](placeholderValues);
        }
        return new ExecuteResultSync(() => this[this.executeMethod](placeholderValues));
      }
      mapResult(response, isFromBatch) {
        switch (this.executeMethod) {
          case "run": {
            return this.mapRunResult(response, isFromBatch);
          }
          case "all": {
            return this.mapAllResult(response, isFromBatch);
          }
          case "get": {
            return this.mapGetResult(response, isFromBatch);
          }
        }
      }
    }, "SQLitePreparedQuery");
    __name2(SQLitePreparedQuery, "SQLitePreparedQuery");
    _a112 = entityKind;
    __publicField(SQLitePreparedQuery, _a112, "PreparedQuery");
    SQLiteSession = /* @__PURE__ */ __name(class {
      constructor(dialect) {
        this.dialect = dialect;
      }
      prepareOneTimeQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        return this.prepareQuery(
          query,
          fields,
          executeMethod,
          isResponseInArrayMode,
          customResultMapper,
          queryMetadata,
          cacheConfig
        );
      }
      run(query) {
        const staticQuery = this.dialect.sqlToQuery(query);
        try {
          return this.prepareOneTimeQuery(staticQuery, void 0, "run", false).run();
        } catch (err) {
          throw new DrizzleError({ cause: err, message: `Failed to run the query '${staticQuery.sql}'` });
        }
      }
      /** @internal */
      extractRawRunValueFromBatchResult(result) {
        return result;
      }
      all(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).all();
      }
      /** @internal */
      extractRawAllValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      get(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).get();
      }
      /** @internal */
      extractRawGetValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
      values(query) {
        return this.prepareOneTimeQuery(this.dialect.sqlToQuery(query), void 0, "run", false).values();
      }
      async count(sql2) {
        const result = await this.values(sql2);
        return result[0][0];
      }
      /** @internal */
      extractRawValuesValueFromBatchResult(_result) {
        throw new Error("Not implemented");
      }
    }, "SQLiteSession");
    __name2(SQLiteSession, "SQLiteSession");
    _a113 = entityKind;
    __publicField(SQLiteSession, _a113, "SQLiteSession");
    SQLiteTransaction = /* @__PURE__ */ __name(class extends BaseSQLiteDatabase {
      constructor(resultType, dialect, session, schema, nestedIndex = 0) {
        super(resultType, dialect, session, schema);
        this.schema = schema;
        this.nestedIndex = nestedIndex;
      }
      rollback() {
        throw new TransactionRollbackError();
      }
    }, "SQLiteTransaction");
    __name2(SQLiteTransaction, "SQLiteTransaction");
    _a114 = entityKind;
    __publicField(SQLiteTransaction, _a114, "SQLiteTransaction");
  }
});
var init_subquery2 = __esm({
  "../node_modules/drizzle-orm/sqlite-core/subquery.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
  }
});
var _a115;
var ViewBuilderCore;
var _a116;
var ViewBuilder;
var _a117;
var ManualViewBuilder;
var _a118;
var SQLiteView;
var init_view = __esm({
  "../node_modules/drizzle-orm/sqlite-core/view.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_selection_proxy();
    init_utils();
    init_query_builder2();
    init_table3();
    init_view_base();
    ViewBuilderCore = /* @__PURE__ */ __name(class {
      constructor(name) {
        this.name = name;
      }
      config = {};
    }, "ViewBuilderCore");
    __name2(ViewBuilderCore, "ViewBuilderCore");
    _a115 = entityKind;
    __publicField(ViewBuilderCore, _a115, "SQLiteViewBuilderCore");
    ViewBuilder = /* @__PURE__ */ __name(class extends ViewBuilderCore {
      as(qb) {
        if (typeof qb === "function") {
          qb = qb(new QueryBuilder());
        }
        const selectionProxy = new SelectionProxyHandler({
          alias: this.name,
          sqlBehavior: "error",
          sqlAliasedBehavior: "alias",
          replaceOriginalName: true
        });
        const aliasedSelectedFields = qb.getSelectedFields();
        return new Proxy(
          new SQLiteView({
            // sqliteConfig: this.config,
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: aliasedSelectedFields,
              query: qb.getSQL().inlineParams()
            }
          }),
          selectionProxy
        );
      }
    }, "ViewBuilder");
    __name2(ViewBuilder, "ViewBuilder");
    _a116 = entityKind;
    __publicField(ViewBuilder, _a116, "SQLiteViewBuilder");
    ManualViewBuilder = /* @__PURE__ */ __name(class extends ViewBuilderCore {
      columns;
      constructor(name, columns) {
        super(name);
        this.columns = getTableColumns(sqliteTable(name, columns));
      }
      existing() {
        return new Proxy(
          new SQLiteView({
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: void 0
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
      as(query) {
        return new Proxy(
          new SQLiteView({
            config: {
              name: this.name,
              schema: void 0,
              selectedFields: this.columns,
              query: query.inlineParams()
            }
          }),
          new SelectionProxyHandler({
            alias: this.name,
            sqlBehavior: "error",
            sqlAliasedBehavior: "alias",
            replaceOriginalName: true
          })
        );
      }
    }, "ManualViewBuilder");
    __name2(ManualViewBuilder, "ManualViewBuilder");
    _a117 = entityKind;
    __publicField(ManualViewBuilder, _a117, "SQLiteManualViewBuilder");
    SQLiteView = /* @__PURE__ */ __name(class extends SQLiteViewBase {
      constructor({ config }) {
        super(config);
      }
    }, "SQLiteView");
    __name2(SQLiteView, "SQLiteView");
    _a118 = entityKind;
    __publicField(SQLiteView, _a118, "SQLiteView");
  }
});
var init_sqlite_core = __esm({
  "../node_modules/drizzle-orm/sqlite-core/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_alias2();
    init_checks();
    init_columns();
    init_db();
    init_dialect();
    init_foreign_keys2();
    init_indexes();
    init_primary_keys2();
    init_query_builders();
    init_session();
    init_subquery2();
    init_table3();
    init_unique_constraint2();
    init_utils2();
    init_view();
  }
});
function d1ToRawMapping(results) {
  const rows = [];
  for (const row of results) {
    const entry = Object.keys(row).map((k) => row[k]);
    rows.push(entry);
  }
  return rows;
}
__name(d1ToRawMapping, "d1ToRawMapping");
var _a119;
var SQLiteD1Session;
var _a120;
var _D1Transaction;
var D1Transaction;
var _a121;
var D1PreparedQuery;
var init_session2 = __esm({
  "../node_modules/drizzle-orm/d1/session.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_core();
    init_entity();
    init_logger();
    init_sql();
    init_sqlite_core();
    init_session();
    init_utils();
    SQLiteD1Session = /* @__PURE__ */ __name(class extends SQLiteSession {
      constructor(client, dialect, schema, options = {}) {
        super(dialect);
        this.client = client;
        this.schema = schema;
        this.options = options;
        this.logger = options.logger ?? new NoopLogger();
        this.cache = options.cache ?? new NoopCache();
      }
      logger;
      cache;
      prepareQuery(query, fields, executeMethod, isResponseInArrayMode, customResultMapper, queryMetadata, cacheConfig) {
        const stmt = this.client.prepare(query.sql);
        return new D1PreparedQuery(
          stmt,
          query,
          this.logger,
          this.cache,
          queryMetadata,
          cacheConfig,
          fields,
          executeMethod,
          isResponseInArrayMode,
          customResultMapper
        );
      }
      async batch(queries) {
        const preparedQueries = [];
        const builtQueries = [];
        for (const query of queries) {
          const preparedQuery = query._prepare();
          const builtQuery = preparedQuery.getQuery();
          preparedQueries.push(preparedQuery);
          if (builtQuery.params.length > 0) {
            builtQueries.push(preparedQuery.stmt.bind(...builtQuery.params));
          } else {
            const builtQuery2 = preparedQuery.getQuery();
            builtQueries.push(
              this.client.prepare(builtQuery2.sql).bind(...builtQuery2.params)
            );
          }
        }
        const batchResults = await this.client.batch(builtQueries);
        return batchResults.map((result, i) => preparedQueries[i].mapResult(result, true));
      }
      extractRawAllValueFromBatchResult(result) {
        return result.results;
      }
      extractRawGetValueFromBatchResult(result) {
        return result.results[0];
      }
      extractRawValuesValueFromBatchResult(result) {
        return d1ToRawMapping(result.results);
      }
      async transaction(transaction, config) {
        const tx = new D1Transaction("async", this.dialect, this, this.schema);
        await this.run(sql.raw(`begin${config?.behavior ? " " + config.behavior : ""}`));
        try {
          const result = await transaction(tx);
          await this.run(sql`commit`);
          return result;
        } catch (err) {
          await this.run(sql`rollback`);
          throw err;
        }
      }
    }, "SQLiteD1Session");
    __name2(SQLiteD1Session, "SQLiteD1Session");
    _a119 = entityKind;
    __publicField(SQLiteD1Session, _a119, "SQLiteD1Session");
    _D1Transaction = /* @__PURE__ */ __name(class extends SQLiteTransaction {
      async transaction(transaction) {
        const savepointName = `sp${this.nestedIndex}`;
        const tx = new _D1Transaction("async", this.dialect, this.session, this.schema, this.nestedIndex + 1);
        await this.session.run(sql.raw(`savepoint ${savepointName}`));
        try {
          const result = await transaction(tx);
          await this.session.run(sql.raw(`release savepoint ${savepointName}`));
          return result;
        } catch (err) {
          await this.session.run(sql.raw(`rollback to savepoint ${savepointName}`));
          throw err;
        }
      }
    }, "_D1Transaction");
    D1Transaction = _D1Transaction;
    __name2(D1Transaction, "D1Transaction");
    _a120 = entityKind;
    __publicField(D1Transaction, _a120, "D1Transaction");
    __name2(d1ToRawMapping, "d1ToRawMapping");
    D1PreparedQuery = /* @__PURE__ */ __name(class extends SQLitePreparedQuery {
      constructor(stmt, query, logger2, cache, queryMetadata, cacheConfig, fields, executeMethod, _isResponseInArrayMode, customResultMapper) {
        super("async", executeMethod, query, cache, queryMetadata, cacheConfig);
        this.logger = logger2;
        this._isResponseInArrayMode = _isResponseInArrayMode;
        this.customResultMapper = customResultMapper;
        this.fields = fields;
        this.stmt = stmt;
      }
      /** @internal */
      customResultMapper;
      /** @internal */
      fields;
      /** @internal */
      stmt;
      async run(placeholderValues) {
        const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        return await this.queryWithCache(this.query.sql, params, async () => {
          return this.stmt.bind(...params).run();
        });
      }
      async all(placeholderValues) {
        const { fields, query, logger: logger2, stmt, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          const params = fillPlaceholders(query.params, placeholderValues ?? {});
          logger2.logQuery(query.sql, params);
          return await this.queryWithCache(query.sql, params, async () => {
            return stmt.bind(...params).all().then(({ results }) => this.mapAllResult(results));
          });
        }
        const rows = await this.values(placeholderValues);
        return this.mapAllResult(rows);
      }
      mapAllResult(rows, isFromBatch) {
        if (isFromBatch) {
          rows = d1ToRawMapping(rows.results);
        }
        if (!this.fields && !this.customResultMapper) {
          return rows;
        }
        if (this.customResultMapper) {
          return this.customResultMapper(rows);
        }
        return rows.map((row) => mapResultRow(this.fields, row, this.joinsNotNullableMap));
      }
      async get(placeholderValues) {
        const { fields, joinsNotNullableMap, query, logger: logger2, stmt, customResultMapper } = this;
        if (!fields && !customResultMapper) {
          const params = fillPlaceholders(query.params, placeholderValues ?? {});
          logger2.logQuery(query.sql, params);
          return await this.queryWithCache(query.sql, params, async () => {
            return stmt.bind(...params).all().then(({ results }) => results[0]);
          });
        }
        const rows = await this.values(placeholderValues);
        if (!rows[0]) {
          return void 0;
        }
        if (customResultMapper) {
          return customResultMapper(rows);
        }
        return mapResultRow(fields, rows[0], joinsNotNullableMap);
      }
      mapGetResult(result, isFromBatch) {
        if (isFromBatch) {
          result = d1ToRawMapping(result.results)[0];
        }
        if (!this.fields && !this.customResultMapper) {
          return result;
        }
        if (this.customResultMapper) {
          return this.customResultMapper([result]);
        }
        return mapResultRow(this.fields, result, this.joinsNotNullableMap);
      }
      async values(placeholderValues) {
        const params = fillPlaceholders(this.query.params, placeholderValues ?? {});
        this.logger.logQuery(this.query.sql, params);
        return await this.queryWithCache(this.query.sql, params, async () => {
          return this.stmt.bind(...params).raw();
        });
      }
      /** @internal */
      isResponseInArrayMode() {
        return this._isResponseInArrayMode;
      }
    }, "D1PreparedQuery");
    __name2(D1PreparedQuery, "D1PreparedQuery");
    _a121 = entityKind;
    __publicField(D1PreparedQuery, _a121, "D1PreparedQuery");
  }
});
function drizzle(client, config = {}) {
  const dialect = new SQLiteAsyncDialect({ casing: config.casing });
  let logger2;
  if (config.logger === true) {
    logger2 = new DefaultLogger();
  } else if (config.logger !== false) {
    logger2 = config.logger;
  }
  let schema;
  if (config.schema) {
    const tablesConfig = extractTablesRelationalConfig(
      config.schema,
      createTableRelationsHelpers
    );
    schema = {
      fullSchema: config.schema,
      schema: tablesConfig.tables,
      tableNamesMap: tablesConfig.tableNamesMap
    };
  }
  const session = new SQLiteD1Session(client, dialect, schema, { logger: logger2, cache: config.cache });
  const db = new DrizzleD1Database("async", dialect, session, schema);
  db.$client = client;
  db.$cache = config.cache;
  if (db.$cache) {
    db.$cache["invalidate"] = config.cache?.onMutate;
  }
  return db;
}
__name(drizzle, "drizzle");
var _a122;
var DrizzleD1Database;
var init_driver = __esm({
  "../node_modules/drizzle-orm/d1/driver.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_entity();
    init_logger();
    init_relations();
    init_db();
    init_dialect();
    init_session2();
    DrizzleD1Database = /* @__PURE__ */ __name(class extends BaseSQLiteDatabase {
      async batch(batch) {
        return this.session.batch(batch);
      }
    }, "DrizzleD1Database");
    __name2(DrizzleD1Database, "DrizzleD1Database");
    _a122 = entityKind;
    __publicField(DrizzleD1Database, _a122, "D1Database");
    __name2(drizzle, "drizzle");
  }
});
var init_operations = __esm({
  "../node_modules/drizzle-orm/operations.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
  }
});
var init_drizzle_orm = __esm({
  "../node_modules/drizzle-orm/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_alias();
    init_column_builder();
    init_column();
    init_entity();
    init_errors();
    init_logger();
    init_operations();
    init_query_promise();
    init_relations();
    init_sql2();
    init_subquery();
    init_table();
    init_utils();
    init_view_common();
  }
});
var DEBUG_BUILD;
var init_debug_build = __esm({
  "../node_modules/@sentry/core/build/esm/debug-build.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    DEBUG_BUILD = typeof __SENTRY_DEBUG__ === "undefined" || __SENTRY_DEBUG__;
  }
});
var GLOBAL_OBJ;
var init_worldwide = __esm({
  "../node_modules/@sentry/core/build/esm/utils/worldwide.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    GLOBAL_OBJ = globalThis;
  }
});
var SDK_VERSION;
var init_version2 = __esm({
  "../node_modules/@sentry/core/build/esm/utils/version.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    SDK_VERSION = "9.35.0";
  }
});
function getMainCarrier() {
  getSentryCarrier(GLOBAL_OBJ);
  return GLOBAL_OBJ;
}
__name(getMainCarrier, "getMainCarrier");
function getSentryCarrier(carrier) {
  const __SENTRY__ = carrier.__SENTRY__ = carrier.__SENTRY__ || {};
  __SENTRY__.version = __SENTRY__.version || SDK_VERSION;
  return __SENTRY__[SDK_VERSION] = __SENTRY__[SDK_VERSION] || {};
}
__name(getSentryCarrier, "getSentryCarrier");
function getGlobalSingleton(name, creator, obj = GLOBAL_OBJ) {
  const __SENTRY__ = obj.__SENTRY__ = obj.__SENTRY__ || {};
  const carrier = __SENTRY__[SDK_VERSION] = __SENTRY__[SDK_VERSION] || {};
  return carrier[name] || (carrier[name] = creator());
}
__name(getGlobalSingleton, "getGlobalSingleton");
var init_carrier = __esm({
  "../node_modules/@sentry/core/build/esm/carrier.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_version2();
    init_worldwide();
    __name2(getMainCarrier, "getMainCarrier");
    __name2(getSentryCarrier, "getSentryCarrier");
    __name2(getGlobalSingleton, "getGlobalSingleton");
  }
});
function consoleSandbox(callback) {
  if (!("console" in GLOBAL_OBJ)) {
    return callback();
  }
  const console2 = GLOBAL_OBJ.console;
  const wrappedFuncs = {};
  const wrappedLevels = Object.keys(originalConsoleMethods);
  wrappedLevels.forEach((level) => {
    const originalConsoleMethod = originalConsoleMethods[level];
    wrappedFuncs[level] = console2[level];
    console2[level] = originalConsoleMethod;
  });
  try {
    return callback();
  } finally {
    wrappedLevels.forEach((level) => {
      console2[level] = wrappedFuncs[level];
    });
  }
}
__name(consoleSandbox, "consoleSandbox");
function makeLogger() {
  let enabled = false;
  const logger2 = {
    enable: () => {
      enabled = true;
    },
    disable: () => {
      enabled = false;
    },
    isEnabled: () => enabled
  };
  if (DEBUG_BUILD) {
    CONSOLE_LEVELS.forEach((name) => {
      logger2[name] = (...args) => {
        if (enabled) {
          consoleSandbox(() => {
            GLOBAL_OBJ.console[name](`${PREFIX}[${name}]:`, ...args);
          });
        }
      };
    });
  } else {
    CONSOLE_LEVELS.forEach((name) => {
      logger2[name] = () => void 0;
    });
  }
  return logger2;
}
__name(makeLogger, "makeLogger");
var PREFIX;
var CONSOLE_LEVELS;
var originalConsoleMethods;
var logger;
var init_logger2 = __esm({
  "../node_modules/@sentry/core/build/esm/utils/logger.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_carrier();
    init_debug_build();
    init_worldwide();
    PREFIX = "Sentry Logger ";
    CONSOLE_LEVELS = [
      "debug",
      "info",
      "warn",
      "error",
      "log",
      "assert",
      "trace"
    ];
    originalConsoleMethods = {};
    __name2(consoleSandbox, "consoleSandbox");
    __name2(makeLogger, "makeLogger");
    logger = getGlobalSingleton("logger", makeLogger);
  }
});
function isBuiltin(wat, className) {
  return objectToString.call(wat) === `[object ${className}]`;
}
__name(isBuiltin, "isBuiltin");
function isPlainObject(wat) {
  return isBuiltin(wat, "Object");
}
__name(isPlainObject, "isPlainObject");
function isThenable(wat) {
  return Boolean(wat?.then && typeof wat.then === "function");
}
__name(isThenable, "isThenable");
var objectToString;
var init_is = __esm({
  "../node_modules/@sentry/core/build/esm/utils/is.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    objectToString = Object.prototype.toString;
    __name2(isBuiltin, "isBuiltin");
    __name2(isPlainObject, "isPlainObject");
    __name2(isThenable, "isThenable");
  }
});
function truncate(str, max = 0) {
  if (typeof str !== "string" || max === 0) {
    return str;
  }
  return str.length <= max ? str : `${str.slice(0, max)}...`;
}
__name(truncate, "truncate");
var init_string = __esm({
  "../node_modules/@sentry/core/build/esm/utils/string.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    __name2(truncate, "truncate");
  }
});
function addNonEnumerableProperty(obj, name, value) {
  try {
    Object.defineProperty(obj, name, {
      // enumerable: false, // the default, so we can save on bundle size by not explicitly setting it
      value,
      writable: true,
      configurable: true
    });
  } catch (o_O) {
    DEBUG_BUILD && logger.log(`Failed to add non-enumerable property "${name}" to object`, obj);
  }
}
__name(addNonEnumerableProperty, "addNonEnumerableProperty");
var init_object = __esm({
  "../node_modules/@sentry/core/build/esm/utils/object.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_debug_build();
    init_logger2();
    __name2(addNonEnumerableProperty, "addNonEnumerableProperty");
  }
});
function getCrypto() {
  const gbl = GLOBAL_OBJ;
  return gbl.crypto || gbl.msCrypto;
}
__name(getCrypto, "getCrypto");
function uuid4(crypto2 = getCrypto()) {
  let getRandomByte = /* @__PURE__ */ __name2(() => Math.random() * 16, "getRandomByte");
  try {
    if (crypto2?.randomUUID) {
      return crypto2.randomUUID().replace(/-/g, "");
    }
    if (crypto2?.getRandomValues) {
      getRandomByte = /* @__PURE__ */ __name2(() => {
        const typedArray = new Uint8Array(1);
        crypto2.getRandomValues(typedArray);
        return typedArray[0];
      }, "getRandomByte");
    }
  } catch (_) {
  }
  return ([1e7] + 1e3 + 4e3 + 8e3 + 1e11).replace(
    /[018]/g,
    (c) => (
      // eslint-disable-next-line no-bitwise
      (c ^ (getRandomByte() & 15) >> c / 4).toString(16)
    )
  );
}
__name(uuid4, "uuid4");
var init_misc = __esm({
  "../node_modules/@sentry/core/build/esm/utils/misc.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_worldwide();
    __name2(getCrypto, "getCrypto");
    __name2(uuid4, "uuid4");
  }
});
function dateTimestampInSeconds() {
  return Date.now() / ONE_SECOND_IN_MS;
}
__name(dateTimestampInSeconds, "dateTimestampInSeconds");
function createUnixTimestampInSecondsFunc() {
  const { performance } = GLOBAL_OBJ;
  if (!performance?.now) {
    return dateTimestampInSeconds;
  }
  const approxStartingTimeOrigin = Date.now() - performance.now();
  const timeOrigin = performance.timeOrigin == void 0 ? approxStartingTimeOrigin : performance.timeOrigin;
  return () => {
    return (timeOrigin + performance.now()) / ONE_SECOND_IN_MS;
  };
}
__name(createUnixTimestampInSecondsFunc, "createUnixTimestampInSecondsFunc");
var ONE_SECOND_IN_MS;
var timestampInSeconds;
var init_time = __esm({
  "../node_modules/@sentry/core/build/esm/utils/time.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_worldwide();
    ONE_SECOND_IN_MS = 1e3;
    __name2(dateTimestampInSeconds, "dateTimestampInSeconds");
    __name2(createUnixTimestampInSecondsFunc, "createUnixTimestampInSecondsFunc");
    timestampInSeconds = createUnixTimestampInSecondsFunc();
  }
});
function updateSession(session, context = {}) {
  if (context.user) {
    if (!session.ipAddress && context.user.ip_address) {
      session.ipAddress = context.user.ip_address;
    }
    if (!session.did && !context.did) {
      session.did = context.user.id || context.user.email || context.user.username;
    }
  }
  session.timestamp = context.timestamp || timestampInSeconds();
  if (context.abnormal_mechanism) {
    session.abnormal_mechanism = context.abnormal_mechanism;
  }
  if (context.ignoreDuration) {
    session.ignoreDuration = context.ignoreDuration;
  }
  if (context.sid) {
    session.sid = context.sid.length === 32 ? context.sid : uuid4();
  }
  if (context.init !== void 0) {
    session.init = context.init;
  }
  if (!session.did && context.did) {
    session.did = `${context.did}`;
  }
  if (typeof context.started === "number") {
    session.started = context.started;
  }
  if (session.ignoreDuration) {
    session.duration = void 0;
  } else if (typeof context.duration === "number") {
    session.duration = context.duration;
  } else {
    const duration = session.timestamp - session.started;
    session.duration = duration >= 0 ? duration : 0;
  }
  if (context.release) {
    session.release = context.release;
  }
  if (context.environment) {
    session.environment = context.environment;
  }
  if (!session.ipAddress && context.ipAddress) {
    session.ipAddress = context.ipAddress;
  }
  if (!session.userAgent && context.userAgent) {
    session.userAgent = context.userAgent;
  }
  if (typeof context.errors === "number") {
    session.errors = context.errors;
  }
  if (context.status) {
    session.status = context.status;
  }
}
__name(updateSession, "updateSession");
var init_session3 = __esm({
  "../node_modules/@sentry/core/build/esm/session.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_misc();
    init_time();
    __name2(updateSession, "updateSession");
  }
});
function merge(initialObj, mergeObj, levels = 2) {
  if (!mergeObj || typeof mergeObj !== "object" || levels <= 0) {
    return mergeObj;
  }
  if (initialObj && Object.keys(mergeObj).length === 0) {
    return initialObj;
  }
  const output = { ...initialObj };
  for (const key in mergeObj) {
    if (Object.prototype.hasOwnProperty.call(mergeObj, key)) {
      output[key] = merge(output[key], mergeObj[key], levels - 1);
    }
  }
  return output;
}
__name(merge, "merge");
var init_merge = __esm({
  "../node_modules/@sentry/core/build/esm/utils/merge.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    __name2(merge, "merge");
  }
});
function generateTraceId() {
  return uuid4();
}
__name(generateTraceId, "generateTraceId");
var init_propagationContext = __esm({
  "../node_modules/@sentry/core/build/esm/utils/propagationContext.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_misc();
    __name2(generateTraceId, "generateTraceId");
  }
});
function _setSpanForScope(scope, span) {
  if (span) {
    addNonEnumerableProperty(scope, SCOPE_SPAN_FIELD, span);
  } else {
    delete scope[SCOPE_SPAN_FIELD];
  }
}
__name(_setSpanForScope, "_setSpanForScope");
function _getSpanForScope(scope) {
  return scope[SCOPE_SPAN_FIELD];
}
__name(_getSpanForScope, "_getSpanForScope");
var SCOPE_SPAN_FIELD;
var init_spanOnScope = __esm({
  "../node_modules/@sentry/core/build/esm/utils/spanOnScope.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_object();
    SCOPE_SPAN_FIELD = "_sentrySpan";
    __name2(_setSpanForScope, "_setSpanForScope");
    __name2(_getSpanForScope, "_getSpanForScope");
  }
});
var DEFAULT_MAX_BREADCRUMBS;
var Scope;
var init_scope = __esm({
  "../node_modules/@sentry/core/build/esm/scope.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_session3();
    init_is();
    init_logger2();
    init_merge();
    init_misc();
    init_propagationContext();
    init_spanOnScope();
    init_string();
    init_time();
    DEFAULT_MAX_BREADCRUMBS = 100;
    Scope = /* @__PURE__ */ __name(class {
      /** Flag if notifying is happening. */
      /** Callback for client to receive scope changes. */
      /** Callback list that will be called during event processing. */
      /** Array of breadcrumbs. */
      /** User */
      /** Tags */
      /** Extra */
      /** Contexts */
      /** Attachments */
      /** Propagation Context for distributed tracing */
      /**
       * A place to stash data which is needed at some point in the SDK's event processing pipeline but which shouldn't get
       * sent to Sentry
       */
      /** Fingerprint */
      /** Severity */
      /**
       * Transaction Name
       *
       * IMPORTANT: The transaction name on the scope has nothing to do with root spans/transaction objects.
       * It's purpose is to assign a transaction to the scope that's added to non-transaction events.
       */
      /** Session */
      /** The client on this scope */
      /** Contains the last event id of a captured event.  */
      // NOTE: Any field which gets added here should get added not only to the constructor but also to the `clone` method.
      constructor() {
        this._notifyingListeners = false;
        this._scopeListeners = [];
        this._eventProcessors = [];
        this._breadcrumbs = [];
        this._attachments = [];
        this._user = {};
        this._tags = {};
        this._extra = {};
        this._contexts = {};
        this._sdkProcessingMetadata = {};
        this._propagationContext = {
          traceId: generateTraceId(),
          sampleRand: Math.random()
        };
      }
      /**
       * Clone all data from this scope into a new scope.
       */
      clone() {
        const newScope = new Scope();
        newScope._breadcrumbs = [...this._breadcrumbs];
        newScope._tags = { ...this._tags };
        newScope._extra = { ...this._extra };
        newScope._contexts = { ...this._contexts };
        if (this._contexts.flags) {
          newScope._contexts.flags = {
            values: [...this._contexts.flags.values]
          };
        }
        newScope._user = this._user;
        newScope._level = this._level;
        newScope._session = this._session;
        newScope._transactionName = this._transactionName;
        newScope._fingerprint = this._fingerprint;
        newScope._eventProcessors = [...this._eventProcessors];
        newScope._attachments = [...this._attachments];
        newScope._sdkProcessingMetadata = { ...this._sdkProcessingMetadata };
        newScope._propagationContext = { ...this._propagationContext };
        newScope._client = this._client;
        newScope._lastEventId = this._lastEventId;
        _setSpanForScope(newScope, _getSpanForScope(this));
        return newScope;
      }
      /**
       * Update the client assigned to this scope.
       * Note that not every scope will have a client assigned - isolation scopes & the global scope will generally not have a client,
       * as well as manually created scopes.
       */
      setClient(client) {
        this._client = client;
      }
      /**
       * Set the ID of the last captured error event.
       * This is generally only captured on the isolation scope.
       */
      setLastEventId(lastEventId2) {
        this._lastEventId = lastEventId2;
      }
      /**
       * Get the client assigned to this scope.
       */
      getClient() {
        return this._client;
      }
      /**
       * Get the ID of the last captured error event.
       * This is generally only available on the isolation scope.
       */
      lastEventId() {
        return this._lastEventId;
      }
      /**
       * @inheritDoc
       */
      addScopeListener(callback) {
        this._scopeListeners.push(callback);
      }
      /**
       * Add an event processor that will be called before an event is sent.
       */
      addEventProcessor(callback) {
        this._eventProcessors.push(callback);
        return this;
      }
      /**
       * Set the user for this scope.
       * Set to `null` to unset the user.
       */
      setUser(user) {
        this._user = user || {
          email: void 0,
          id: void 0,
          ip_address: void 0,
          username: void 0
        };
        if (this._session) {
          updateSession(this._session, { user });
        }
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Get the user from this scope.
       */
      getUser() {
        return this._user;
      }
      /**
       * Set an object that will be merged into existing tags on the scope,
       * and will be sent as tags data with the event.
       */
      setTags(tags) {
        this._tags = {
          ...this._tags,
          ...tags
        };
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Set a single tag that will be sent as tags data with the event.
       */
      setTag(key, value) {
        this._tags = { ...this._tags, [key]: value };
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Set an object that will be merged into existing extra on the scope,
       * and will be sent as extra data with the event.
       */
      setExtras(extras) {
        this._extra = {
          ...this._extra,
          ...extras
        };
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Set a single key:value extra entry that will be sent as extra data with the event.
       */
      setExtra(key, extra) {
        this._extra = { ...this._extra, [key]: extra };
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Sets the fingerprint on the scope to send with the events.
       * @param {string[]} fingerprint Fingerprint to group events in Sentry.
       */
      setFingerprint(fingerprint) {
        this._fingerprint = fingerprint;
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Sets the level on the scope for future events.
       */
      setLevel(level) {
        this._level = level;
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Sets the transaction name on the scope so that the name of e.g. taken server route or
       * the page location is attached to future events.
       *
       * IMPORTANT: Calling this function does NOT change the name of the currently active
       * root span. If you want to change the name of the active root span, use
       * `Sentry.updateSpanName(rootSpan, 'new name')` instead.
       *
       * By default, the SDK updates the scope's transaction name automatically on sensible
       * occasions, such as a page navigation or when handling a new request on the server.
       */
      setTransactionName(name) {
        this._transactionName = name;
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Sets context data with the given name.
       * Data passed as context will be normalized. You can also pass `null` to unset the context.
       * Note that context data will not be merged - calling `setContext` will overwrite an existing context with the same key.
       */
      setContext(key, context) {
        if (context === null) {
          delete this._contexts[key];
        } else {
          this._contexts[key] = context;
        }
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Set the session for the scope.
       */
      setSession(session) {
        if (!session) {
          delete this._session;
        } else {
          this._session = session;
        }
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Get the session from the scope.
       */
      getSession() {
        return this._session;
      }
      /**
       * Updates the scope with provided data. Can work in three variations:
       * - plain object containing updatable attributes
       * - Scope instance that'll extract the attributes from
       * - callback function that'll receive the current scope as an argument and allow for modifications
       */
      update(captureContext) {
        if (!captureContext) {
          return this;
        }
        const scopeToMerge = typeof captureContext === "function" ? captureContext(this) : captureContext;
        const scopeInstance = scopeToMerge instanceof Scope ? scopeToMerge.getScopeData() : isPlainObject(scopeToMerge) ? captureContext : void 0;
        const { tags, extra, user, contexts, level, fingerprint = [], propagationContext } = scopeInstance || {};
        this._tags = { ...this._tags, ...tags };
        this._extra = { ...this._extra, ...extra };
        this._contexts = { ...this._contexts, ...contexts };
        if (user && Object.keys(user).length) {
          this._user = user;
        }
        if (level) {
          this._level = level;
        }
        if (fingerprint.length) {
          this._fingerprint = fingerprint;
        }
        if (propagationContext) {
          this._propagationContext = propagationContext;
        }
        return this;
      }
      /**
       * Clears the current scope and resets its properties.
       * Note: The client will not be cleared.
       */
      clear() {
        this._breadcrumbs = [];
        this._tags = {};
        this._extra = {};
        this._user = {};
        this._contexts = {};
        this._level = void 0;
        this._transactionName = void 0;
        this._fingerprint = void 0;
        this._session = void 0;
        _setSpanForScope(this, void 0);
        this._attachments = [];
        this.setPropagationContext({ traceId: generateTraceId(), sampleRand: Math.random() });
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Adds a breadcrumb to the scope.
       * By default, the last 100 breadcrumbs are kept.
       */
      addBreadcrumb(breadcrumb, maxBreadcrumbs) {
        const maxCrumbs = typeof maxBreadcrumbs === "number" ? maxBreadcrumbs : DEFAULT_MAX_BREADCRUMBS;
        if (maxCrumbs <= 0) {
          return this;
        }
        const mergedBreadcrumb = {
          timestamp: dateTimestampInSeconds(),
          ...breadcrumb,
          // Breadcrumb messages can theoretically be infinitely large and they're held in memory so we truncate them not to leak (too much) memory
          message: breadcrumb.message ? truncate(breadcrumb.message, 2048) : breadcrumb.message
        };
        this._breadcrumbs.push(mergedBreadcrumb);
        if (this._breadcrumbs.length > maxCrumbs) {
          this._breadcrumbs = this._breadcrumbs.slice(-maxCrumbs);
          this._client?.recordDroppedEvent("buffer_overflow", "log_item");
        }
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Get the last breadcrumb of the scope.
       */
      getLastBreadcrumb() {
        return this._breadcrumbs[this._breadcrumbs.length - 1];
      }
      /**
       * Clear all breadcrumbs from the scope.
       */
      clearBreadcrumbs() {
        this._breadcrumbs = [];
        this._notifyScopeListeners();
        return this;
      }
      /**
       * Add an attachment to the scope.
       */
      addAttachment(attachment) {
        this._attachments.push(attachment);
        return this;
      }
      /**
       * Clear all attachments from the scope.
       */
      clearAttachments() {
        this._attachments = [];
        return this;
      }
      /**
       * Get the data of this scope, which should be applied to an event during processing.
       */
      getScopeData() {
        return {
          breadcrumbs: this._breadcrumbs,
          attachments: this._attachments,
          contexts: this._contexts,
          tags: this._tags,
          extra: this._extra,
          user: this._user,
          level: this._level,
          fingerprint: this._fingerprint || [],
          eventProcessors: this._eventProcessors,
          propagationContext: this._propagationContext,
          sdkProcessingMetadata: this._sdkProcessingMetadata,
          transactionName: this._transactionName,
          span: _getSpanForScope(this)
        };
      }
      /**
       * Add data which will be accessible during event processing but won't get sent to Sentry.
       */
      setSDKProcessingMetadata(newData) {
        this._sdkProcessingMetadata = merge(this._sdkProcessingMetadata, newData, 2);
        return this;
      }
      /**
       * Add propagation context to the scope, used for distributed tracing
       */
      setPropagationContext(context) {
        this._propagationContext = context;
        return this;
      }
      /**
       * Get propagation context from the scope, used for distributed tracing
       */
      getPropagationContext() {
        return this._propagationContext;
      }
      /**
       * Capture an exception for this scope.
       *
       * @returns {string} The id of the captured Sentry event.
       */
      captureException(exception, hint) {
        const eventId = hint?.event_id || uuid4();
        if (!this._client) {
          logger.warn("No client configured on scope - will not capture exception!");
          return eventId;
        }
        const syntheticException = new Error("Sentry syntheticException");
        this._client.captureException(
          exception,
          {
            originalException: exception,
            syntheticException,
            ...hint,
            event_id: eventId
          },
          this
        );
        return eventId;
      }
      /**
       * Capture a message for this scope.
       *
       * @returns {string} The id of the captured message.
       */
      captureMessage(message, level, hint) {
        const eventId = hint?.event_id || uuid4();
        if (!this._client) {
          logger.warn("No client configured on scope - will not capture message!");
          return eventId;
        }
        const syntheticException = new Error(message);
        this._client.captureMessage(
          message,
          level,
          {
            originalException: message,
            syntheticException,
            ...hint,
            event_id: eventId
          },
          this
        );
        return eventId;
      }
      /**
       * Capture a Sentry event for this scope.
       *
       * @returns {string} The id of the captured event.
       */
      captureEvent(event, hint) {
        const eventId = hint?.event_id || uuid4();
        if (!this._client) {
          logger.warn("No client configured on scope - will not capture event!");
          return eventId;
        }
        this._client.captureEvent(event, { ...hint, event_id: eventId }, this);
        return eventId;
      }
      /**
       * This will be called on every set call.
       */
      _notifyScopeListeners() {
        if (!this._notifyingListeners) {
          this._notifyingListeners = true;
          this._scopeListeners.forEach((callback) => {
            callback(this);
          });
          this._notifyingListeners = false;
        }
      }
    }, "Scope");
    __name2(Scope, "Scope");
  }
});
function getDefaultCurrentScope() {
  return getGlobalSingleton("defaultCurrentScope", () => new Scope());
}
__name(getDefaultCurrentScope, "getDefaultCurrentScope");
function getDefaultIsolationScope() {
  return getGlobalSingleton("defaultIsolationScope", () => new Scope());
}
__name(getDefaultIsolationScope, "getDefaultIsolationScope");
var init_defaultScopes = __esm({
  "../node_modules/@sentry/core/build/esm/defaultScopes.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_carrier();
    init_scope();
    __name2(getDefaultCurrentScope, "getDefaultCurrentScope");
    __name2(getDefaultIsolationScope, "getDefaultIsolationScope");
  }
});
function getAsyncContextStack() {
  const registry = getMainCarrier();
  const sentry = getSentryCarrier(registry);
  return sentry.stack = sentry.stack || new AsyncContextStack(getDefaultCurrentScope(), getDefaultIsolationScope());
}
__name(getAsyncContextStack, "getAsyncContextStack");
function withScope(callback) {
  return getAsyncContextStack().withScope(callback);
}
__name(withScope, "withScope");
function withSetScope(scope, callback) {
  const stack = getAsyncContextStack();
  return stack.withScope(() => {
    stack.getStackTop().scope = scope;
    return callback(scope);
  });
}
__name(withSetScope, "withSetScope");
function withIsolationScope(callback) {
  return getAsyncContextStack().withScope(() => {
    return callback(getAsyncContextStack().getIsolationScope());
  });
}
__name(withIsolationScope, "withIsolationScope");
function getStackAsyncContextStrategy() {
  return {
    withIsolationScope,
    withScope,
    withSetScope,
    withSetIsolationScope: (_isolationScope, callback) => {
      return withIsolationScope(callback);
    },
    getCurrentScope: () => getAsyncContextStack().getScope(),
    getIsolationScope: () => getAsyncContextStack().getIsolationScope()
  };
}
__name(getStackAsyncContextStrategy, "getStackAsyncContextStrategy");
var AsyncContextStack;
var init_stackStrategy = __esm({
  "../node_modules/@sentry/core/build/esm/asyncContext/stackStrategy.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_defaultScopes();
    init_scope();
    init_is();
    init_carrier();
    AsyncContextStack = /* @__PURE__ */ __name(class {
      constructor(scope, isolationScope) {
        let assignedScope;
        if (!scope) {
          assignedScope = new Scope();
        } else {
          assignedScope = scope;
        }
        let assignedIsolationScope;
        if (!isolationScope) {
          assignedIsolationScope = new Scope();
        } else {
          assignedIsolationScope = isolationScope;
        }
        this._stack = [{ scope: assignedScope }];
        this._isolationScope = assignedIsolationScope;
      }
      /**
       * Fork a scope for the stack.
       */
      withScope(callback) {
        const scope = this._pushScope();
        let maybePromiseResult;
        try {
          maybePromiseResult = callback(scope);
        } catch (e) {
          this._popScope();
          throw e;
        }
        if (isThenable(maybePromiseResult)) {
          return maybePromiseResult.then(
            (res) => {
              this._popScope();
              return res;
            },
            (e) => {
              this._popScope();
              throw e;
            }
          );
        }
        this._popScope();
        return maybePromiseResult;
      }
      /**
       * Get the client of the stack.
       */
      getClient() {
        return this.getStackTop().client;
      }
      /**
       * Returns the scope of the top stack.
       */
      getScope() {
        return this.getStackTop().scope;
      }
      /**
       * Get the isolation scope for the stack.
       */
      getIsolationScope() {
        return this._isolationScope;
      }
      /**
       * Returns the topmost scope layer in the order domain > local > process.
       */
      getStackTop() {
        return this._stack[this._stack.length - 1];
      }
      /**
       * Push a scope to the stack.
       */
      _pushScope() {
        const scope = this.getScope().clone();
        this._stack.push({
          client: this.getClient(),
          scope
        });
        return scope;
      }
      /**
       * Pop a scope from the stack.
       */
      _popScope() {
        if (this._stack.length <= 1)
          return false;
        return !!this._stack.pop();
      }
    }, "AsyncContextStack");
    __name2(AsyncContextStack, "AsyncContextStack");
    __name2(getAsyncContextStack, "getAsyncContextStack");
    __name2(withScope, "withScope");
    __name2(withSetScope, "withSetScope");
    __name2(withIsolationScope, "withIsolationScope");
    __name2(getStackAsyncContextStrategy, "getStackAsyncContextStrategy");
  }
});
function getAsyncContextStrategy(carrier) {
  const sentry = getSentryCarrier(carrier);
  if (sentry.acs) {
    return sentry.acs;
  }
  return getStackAsyncContextStrategy();
}
__name(getAsyncContextStrategy, "getAsyncContextStrategy");
var init_asyncContext = __esm({
  "../node_modules/@sentry/core/build/esm/asyncContext/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_carrier();
    init_stackStrategy();
    __name2(getAsyncContextStrategy, "getAsyncContextStrategy");
  }
});
function getCurrentScope() {
  const carrier = getMainCarrier();
  const acs = getAsyncContextStrategy(carrier);
  return acs.getCurrentScope();
}
__name(getCurrentScope, "getCurrentScope");
var init_currentScopes = __esm({
  "../node_modules/@sentry/core/build/esm/currentScopes.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_asyncContext();
    init_carrier();
    __name2(getCurrentScope, "getCurrentScope");
  }
});
function parseEventHintOrCaptureContext(hint) {
  if (!hint) {
    return void 0;
  }
  if (hintIsScopeOrFunction(hint)) {
    return { captureContext: hint };
  }
  if (hintIsScopeContext(hint)) {
    return {
      captureContext: hint
    };
  }
  return hint;
}
__name(parseEventHintOrCaptureContext, "parseEventHintOrCaptureContext");
function hintIsScopeOrFunction(hint) {
  return hint instanceof Scope || typeof hint === "function";
}
__name(hintIsScopeOrFunction, "hintIsScopeOrFunction");
function hintIsScopeContext(hint) {
  return Object.keys(hint).some((key) => captureContextKeys.includes(key));
}
__name(hintIsScopeContext, "hintIsScopeContext");
var captureContextKeys;
var init_prepareEvent = __esm({
  "../node_modules/@sentry/core/build/esm/utils/prepareEvent.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_scope();
    __name2(parseEventHintOrCaptureContext, "parseEventHintOrCaptureContext");
    __name2(hintIsScopeOrFunction, "hintIsScopeOrFunction");
    captureContextKeys = [
      "user",
      "level",
      "extra",
      "contexts",
      "tags",
      "fingerprint",
      "propagationContext"
    ];
    __name2(hintIsScopeContext, "hintIsScopeContext");
  }
});
function captureException(exception, hint) {
  return getCurrentScope().captureException(exception, parseEventHintOrCaptureContext(hint));
}
__name(captureException, "captureException");
var init_exports = __esm({
  "../node_modules/@sentry/core/build/esm/exports.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_currentScopes();
    init_prepareEvent();
    __name2(captureException, "captureException");
  }
});
var init_esm = __esm({
  "../node_modules/@sentry/core/build/esm/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_exports();
  }
});
var init_esm2 = __esm({
  "../node_modules/@sentry/cloudflare/build/esm/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_esm();
  }
});
function uuidv4() {
  return "10000000-1000-4000-8000-100000000000".replace(
    /[018]/g,
    (c) => (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
  );
}
__name(uuidv4, "uuidv4");
function removeUndefinedValues(obj) {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== void 0)
  );
}
__name(removeUndefinedValues, "removeUndefinedValues");
var jsonResponse;
var reportError;
var init_cfPagesFunctionsUtils = __esm({
  "api/cfPagesFunctionsUtils.ts"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_driver();
    init_drizzle_orm();
    init_esm2();
    jsonResponse = /* @__PURE__ */ __name2((retval, options) => {
      if (typeof options === "number") {
        options = {
          statusCode: options
        };
      }
      const body = retval !== null && typeof retval === "object" ? JSON.stringify(retval) : retval;
      const status = options?.statusCode ?? 200;
      const headers = removeUndefinedValues({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS, GET, PUT, POST, DELETE, HEAD",
        "Access-Control-Allow-Headers": "Content-Type",
        ...options?.headers ? options.headers : {}
      });
      return new Response(body, {
        status,
        headers
      });
    }, "jsonResponse");
    reportError = /* @__PURE__ */ __name2(async (db, error) => {
      const e = error instanceof Error ? error : new Error(String(error));
      console.error(e);
      captureException(e);
      const id = uuidv4();
      const message = e.message;
      const createdAt = (/* @__PURE__ */ new Date()).toISOString();
      const json = JSON.stringify({
        stack: e.stack,
        name: e.name,
        cause: e.cause
      });
      if (db instanceof DrizzleD1Database) {
        await db.run(sql`INSERT INTO error (id, message, created_at, json) VALUES (${id}, ${message}, ${createdAt}, ${json});`);
      } else {
        await db.prepare("INSERT INTO error (id, message, created_at, json) VALUES (?1, ?2, ?3, ?4);").bind(id, message, createdAt, json).run();
      }
    }, "reportError");
    __name2(uuidv4, "uuidv4");
    __name2(removeUndefinedValues, "removeUndefinedValues");
  }
});
var init_d1 = __esm({
  "../node_modules/drizzle-orm/d1/index.js"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_driver();
    init_session2();
  }
});
var conversations;
var messages;
var init_schema = __esm({
  "../src/db/schema.ts"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_sqlite_core();
    conversations = sqliteTable("conversations", {
      id: text("id").primaryKey(),
      users: text("users").notNull(),
      // JSON string of user array
      createdAt: text("created_at").notNull(),
      updatedAt: text("updated_at").notNull()
    });
    messages = sqliteTable("messages", {
      id: text("id").primaryKey(),
      type: text("type").notNull(),
      // 'text', 'send_payment', 'request_payment'
      conversationId: text("conversation_id").notNull().references(() => conversations.id, { onDelete: "cascade" }),
      sender: text("sender").notNull(),
      content: text("content"),
      // Message content for text messages
      amount: text("amount"),
      // Payment amount for payment messages
      currency: text("currency"),
      // Currency for payment messages
      timestamp: text("timestamp").notNull(),
      createdAt: text("created_at").notNull()
    });
  }
});
var onRequestGet;
var init_getconversations = __esm({
  "api/getconversations.ts"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_cfPagesFunctionsUtils();
    init_d1();
    init_schema();
    init_drizzle_orm();
    onRequestGet = /* @__PURE__ */ __name2(async (ctx) => {
      const db = drizzle(ctx.env.DB, { logger: true });
      try {
        const url = new URL(ctx.request.url);
        const userId = url.searchParams.get("userId");
        if (!userId) {
          return jsonResponse({ error: "userId parameter is required" }, 400);
        }
        const userConversations = await db.select().from(conversations).where(like(conversations.users, `%"${userId}"%`)).orderBy(conversations.updatedAt);
        const parsedConversations = userConversations.map((conv) => ({
          ...conv,
          users: JSON.parse(conv.users)
        }));
        return jsonResponse({ conversations: parsedConversations }, 200);
      } catch (e) {
        await reportError(ctx.env.DB, e);
        return jsonResponse({ error: "Failed to get conversations" }, 500);
      }
    }, "onRequestGet");
  }
});
var onRequestGet2;
var init_getmessages = __esm({
  "api/getmessages.ts"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_cfPagesFunctionsUtils();
    init_d1();
    init_schema();
    init_drizzle_orm();
    onRequestGet2 = /* @__PURE__ */ __name2(async (ctx) => {
      const db = drizzle(ctx.env.DB, { logger: true });
      try {
        const url = new URL(ctx.request.url);
        const conversationId = url.searchParams.get("conversationId");
        const limit = url.searchParams.get("limit");
        const offset = url.searchParams.get("offset");
        if (!conversationId) {
          return jsonResponse({ error: "conversationId parameter is required" }, 400);
        }
        const limitNum = limit ? parseInt(limit, 10) : void 0;
        const offsetNum = offset ? parseInt(offset, 10) : void 0;
        let conversationMessages;
        if (limitNum && limitNum > 0 && offsetNum && offsetNum > 0) {
          conversationMessages = await db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(desc(messages.timestamp)).limit(limitNum).offset(offsetNum);
        } else if (limitNum && limitNum > 0) {
          conversationMessages = await db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(desc(messages.timestamp)).limit(limitNum);
        } else {
          conversationMessages = await db.select().from(messages).where(eq(messages.conversationId, conversationId)).orderBy(desc(messages.timestamp));
        }
        return jsonResponse({
          messages: conversationMessages,
          count: conversationMessages.length
        }, 200);
      } catch (e) {
        await reportError(ctx.env.DB, e);
        return jsonResponse({ error: "Failed to get messages" }, 500);
      }
    }, "onRequestGet");
  }
});
var onRequestOptions;
var onRequestPost;
var init_postconversation = __esm({
  "api/postconversation.ts"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_cfPagesFunctionsUtils();
    init_d1();
    init_schema();
    onRequestOptions = /* @__PURE__ */ __name2(async () => {
      return jsonResponse(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }, "onRequestOptions");
    onRequestPost = /* @__PURE__ */ __name2(async (ctx) => {
      const db = drizzle(ctx.env.DB, { logger: true });
      try {
        const request = await ctx.request.json();
        if (!request.users || !Array.isArray(request.users) || request.users.length === 0) {
          return jsonResponse({ error: "Users array is required" }, 400);
        }
        const conversationId = crypto.randomUUID();
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const newConversation = {
          id: conversationId,
          users: JSON.stringify(request.users),
          createdAt: now,
          updatedAt: now
        };
        await db.insert(conversations).values(newConversation);
        return jsonResponse({
          id: conversationId,
          users: request.users,
          createdAt: now,
          updatedAt: now
        }, 201);
      } catch (e) {
        await reportError(ctx.env.DB, e);
        return jsonResponse({ error: "Failed to create conversation" }, 500);
      }
    }, "onRequestPost");
  }
});
var onRequestOptions2;
var onRequestPost2;
var init_postmessage = __esm({
  "api/postmessage.ts"() {
    init_functionsRoutes_0_8851702145917575();
    init_checked_fetch();
    init_cfPagesFunctionsUtils();
    init_d1();
    init_schema();
    onRequestOptions2 = /* @__PURE__ */ __name2(async () => {
      return jsonResponse(null, {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type"
        }
      });
    }, "onRequestOptions");
    onRequestPost2 = /* @__PURE__ */ __name2(async (ctx) => {
      const db = drizzle(ctx.env.DB, { logger: true });
      try {
        const request = await ctx.request.json();
        if (!request.type || !request.conversationId || !request.sender) {
          return jsonResponse({ error: "type, conversationId, and sender are required" }, 400);
        }
        if (!["text", "send_payment", "request_payment"].includes(request.type)) {
          return jsonResponse({ error: "type must be text, send_payment, or request_payment" }, 400);
        }
        if ((request.type === "send_payment" || request.type === "request_payment") && (!request.amount || !request.currency)) {
          return jsonResponse({ error: "amount and currency are required for payment messages" }, 400);
        }
        const messageId = crypto.randomUUID();
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const newMessage = {
          id: messageId,
          type: request.type,
          conversationId: request.conversationId,
          sender: request.sender,
          content: request.content || null,
          amount: request.amount || null,
          currency: request.currency || null,
          timestamp: now,
          createdAt: now
        };
        await db.insert(messages).values(newMessage);
        return jsonResponse({
          id: messageId,
          type: request.type,
          conversationId: request.conversationId,
          sender: request.sender,
          content: request.content,
          amount: request.amount,
          currency: request.currency,
          timestamp: now
        }, 201);
      } catch (e) {
        await reportError(ctx.env.DB, e);
        return jsonResponse({ error: "Failed to create message" }, 500);
      }
    }, "onRequestPost");
  }
});
var routes;
var init_functionsRoutes_0_8851702145917575 = __esm({
  "../.wrangler/tmp/pages-dsON7z/functionsRoutes-0.8851702145917575.mjs"() {
    init_getconversations();
    init_getmessages();
    init_postconversation();
    init_postconversation();
    init_postmessage();
    init_postmessage();
    routes = [
      {
        routePath: "/api/getconversations",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet]
      },
      {
        routePath: "/api/getmessages",
        mountPath: "/api",
        method: "GET",
        middlewares: [],
        modules: [onRequestGet2]
      },
      {
        routePath: "/api/postconversation",
        mountPath: "/api",
        method: "OPTIONS",
        middlewares: [],
        modules: [onRequestOptions]
      },
      {
        routePath: "/api/postconversation",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost]
      },
      {
        routePath: "/api/postmessage",
        mountPath: "/api",
        method: "OPTIONS",
        middlewares: [],
        modules: [onRequestOptions2]
      },
      {
        routePath: "/api/postmessage",
        mountPath: "/api",
        method: "POST",
        middlewares: [],
        modules: [onRequestPost2]
      }
    ];
  }
});
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a123 = options.prefixes, prefixes = _a123 === void 0 ? "./" : _a123, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a124 = tokens[i], nextType = _a124.type, index = _a124.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a123 = options.decode, decode = _a123 === void 0 ? function(x) {
    return x;
  } : _a123;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a123 = options.strict, strict = _a123 === void 0 ? false : _a123, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: () => {
            isFailOpen = true;
          }
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
init_functionsRoutes_0_8851702145917575();
init_checked_fetch();
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = /* @__PURE__ */ __name(class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
}, "__Facade_ScheduledController__");
__name2(__Facade_ScheduledController__, "__Facade_ScheduledController__");
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// ../../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// ../../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-eYNu59/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// ../../../../../opt/homebrew/lib/node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-eYNu59/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof __Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
__name(__Facade_ScheduledController__2, "__Facade_ScheduledController__");
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = (request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    };
    #dispatcher = (type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    };
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.4603241275383678.js.map
