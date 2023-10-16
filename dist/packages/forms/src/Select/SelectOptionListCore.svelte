<script>import { writable } from "svelte/store";
import { selectOptionListCoreContext } from "./context.js";
import { getOptionValueKey as _getOptionValueKey } from "./utils.js";
export let key = void 0;
export let multiple = false;
export let options;
export let value = multiple ? [] : void 0;
export let filter = void 0;
export let disabled = void 0;
export let readonly = void 0;
export let valueType = void 0;
const getOptionValueKey = (value2) => {
  return _getOptionValueKey(value2, key);
};
const valueTransformer = (value2) => {
  if (value2 === void 0)
    return value2;
  if (typeof value2 === "object") {
    if (valueType === "advanced") {
      return value2;
    } else {
      return getOptionValueKey(value2);
    }
  }
  return getOptionValueKey(value2);
};
const isOptionInValue = (option, value2) => {
  if (value2 === void 0)
    return false;
  let optionKey = getOptionValueKey(valueTransformer(option.value));
  if (typeof optionKey === "object") {
  }
  if (multiple) {
    if (!value2?.length)
      return false;
    if (Array.isArray(value2)) {
      return value2.findIndex((val) => {
        return getOptionValueKey(valueTransformer(val)) === optionKey;
      }) !== -1;
    }
  } else {
    return getOptionValueKey(valueTransformer(value2)) === optionKey;
  }
  return false;
};
export const set = (newValue) => {
  if (multiple) {
    value = Array.isArray(newValue) ? newValue.map((val) => valueTransformer(val)) : [valueTransformer(newValue)];
  } else {
    value = valueTransformer(newValue);
  }
};
export const clear = () => {
  if (multiple) {
    set([]);
  } else {
    set(void 0);
  }
};
export const add = (option) => {
  if (multiple) {
    if (!value || !Array.isArray(value)) {
      set(option.value);
    } else {
      set([...value, option.value]);
    }
  } else {
    set(option.value);
  }
};
export const remove = (option) => {
  const optionInValue = isOptionInValue(option, value);
  if (multiple) {
    if (!value || !Array.isArray(value)) {
      clear();
    } else if (Array.isArray(value)) {
      if (optionInValue) {
        set(value.filter((val) => getOptionValueKey(val) !== getOptionValueKey(option.value)));
      }
    }
  } else {
    if (optionInValue) {
      clear();
    }
  }
};
const handler = {
  optionClick(option) {
    if (disabled || readonly)
      return;
    const double = isOptionInValue(option, value);
    if (double) {
      remove(option);
    } else {
      add(option);
    }
  }
};
const isActive = (option, _value) => {
  return isOptionInValue(option, _value);
};
$:
  data = (() => {
    let _options = options;
    if (filter) {
      switch (typeof filter) {
        case "function": {
          _options = _options.filter(filter);
          break;
        }
        case "string": {
          _options = _options.filter((option) => option.label === filter);
        }
      }
    }
    return _options.map((option) => {
      const clickHandler = () => {
        handler.optionClick(option);
      };
      return {
        option,
        clickHandler,
        label: option.label || "",
        key: getOptionValueKey(option.value),
        active: isActive(option, value)
      };
    });
  })();
const selectOptionListCoreContextStore = selectOptionListCoreContext.set(writable({
  data
}));
$:
  selectOptionListCoreContextStore.set({
    data
  });
</script>

<slot {data} multiple={multiple}/>