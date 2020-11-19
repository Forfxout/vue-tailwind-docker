# Vue Development Pattern

## Project setup
1. Before you go, please go over .env.example files and 
This template uses docker so if you want to deploy on production please use
```shell
docker-compose up -d --build    # With build
docker-compose up -d            # Without building
```
## Naming conventions
### Components
When creating your components you should follow the convention described bellow:
1. If your component is your custom component and it's located in components directory or subdirectories
```html
<MyComponent/>                 Pascal Case
```
2. If your component installed as npm package and registered locally or globally
```html
<npm-component/>               Kebab Case
```
3. If you don't use **<slots\>** attribute, please use the shortcut
```html
<MyComponent/>                 Correct
<MyComponent></MyComponent>    Wrong
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
