# Vue Development Pattern

---

## Project setup
> Before you go, please go over .env.example files and setup enviroment variables

If you want to serve for development on localhost with **hot-reloads** please use: `yarn serve`

If you're building for production use Docker
```shell
docker-compose up -d --build    # With build
docker-compose up -d            # Without building
```

## Naming conventions
### Components
When creating your components you should follow the convention described bellow:
1. If your component is your custom component and it's located in components directory or subdirectories
```html
<MyComponent/>                  Pascal Case
```
2. If your component installed as npm package and registered locally or globally
```html
<npm-component/>                Kebab Case
```
3. If you don't use **<slots\>** attribute, please use the shortcut
```html
<MyComponent/>                  Correct
<MyComponent></MyComponent>     Wrong
```
4. When you passing props into your component if HTML tag has more than 3 attributes please make them at new line each
```html
<MyComponent name="John" surname="Smith" :age="35" />

<MyComponent
  name="John"
  surname="Smith"
  :age="35" 
  :children="[...]"
/>
```
5. Binding must go through internal Vue shortcuts & Events should be at the bottom/end of the attributes
```html
<MyComponent
  name="John"
  surname="Smith"             
  :children="[...]"           <-- : instead of v-bind
  @child:remove="removeChild" <-- @ instead of v-on:
/>
```

### Methods/Events
When defining your methods in you should follow the convention described bellow:
```js
methods: {
  // Method used to fetch users which are disabled
  fetchDisabledUsers () {
    // Here goes custom event registration
    this.$emit('update:user') // : is a separator
  }
}
```

### SFC Structure
```js
export default {
  // Props should have comment annotation
  props: {
    name: String,
    age: Number,
    surname: String
  },
  mixins: [
    notifications
  ],
  data () {
    return {
      string: '',
      array: [],
      object: {},
      number: 0
    }
  },
  computed: {
    getter () {
      return this.string + this.number
    }
  },
  methods: {
    // Method used to fetch users which are disabled
    fetchDisabledUsers () {
      ...
    }
  },
  watch () {

  },
  mounted () {

  },
  components: {
    Component1,
    Component2
  }
}
```

### Vuex
In this pattern we have all of the vuex going inside of */src/store* folder. Here goes the structure:
```python
modules                       
│─── module              <-  Module Name  (1)
    │─── state.js        <-  State        (2)
    │─── mutations.js    <-  Mutations    (3)
    │─── getters.js      <-  Getters      (4)
    │─── actions.js      <-  Actions      (5)
```
1. Module name represents the name of a module. It's used to map Actions/Getters/Mutations from Vuex inside of your Vue components. When you use mapMutations, mapActions or mapGetters they always should be at the top of the section

**Example** (Vuex import)
```js
export default {
  // Please notice that 'module' is the name of folder located inside of modules folder
  computed () {
    // Getters
    ...mapGetters('module', ['getField'])
  },
  methods () {
    // Mutations
    ...mapMutations('module', ['SET_FIELD']),
    // Actions
    ...mapActions('module', ['fetchField'])
  }
}
```

2. State object shouldn't have any camelcase keys. If you want to use camelcase, it's better to make state depper
   
**Example** (State convention)
```js
export default {
  // Correct
  field: {
    min: 0,
    max: 0
  },
  // Not correct
  fieldMin: 0,
  fieldMax: 0
}
```

3. Mutations should be in snake case with all letters capital. Allowed prefixes are **SET**, **REMOVE**, **ADD**, **INCREASE**, **DECREASE**
Postfix should be like a variable name inside of *state.js*
   
**Example** (Mutations convention)
```js
export default {
  SET_FIELD (state, value) {
    state.field = value
  },
  SET_FIELD_MIN (state, value) {
    state.field.min = value
  }
  ...
}
```

4. Getters should be in camelcase. Allowed prefix are **get**.
Postfix should be like a variable name inside of *state.js*
   
**Example** (Getters convention)
```js
export default {
  getField: state => state.field,
  getFieldMin: state => state.field.min
  ...
}
```

5. Actions should be in camelcase. Actions should be asynchronous function which change state of the module

**Example** (Actions convention)
```js
export default {
  async fetchField () {
    const response = await this.http.get('url')
    commit('SET_FIELD', response.data)
  }
  ...
}
```

### CSS
This pattern uses [Tailwind](https://tailwindcss.org) as the CSS Utility-First framework. All of the customization should be inside of **tailwind.config.js** 

If you want to assign your custom class name it shold be in snake case with all letters low. Just like *my-class* or *my-fav-button*

For the details how to use SASS with Tailwind please read [this](https://tailwindcss.com/docs/using-with-preprocessors)
