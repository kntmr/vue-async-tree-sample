Vue.component('m-tree', {
  template: `
    <li>
      <div class="item" @click="toggle(model.id, $event)" m-loaded="false">
        <span>{{ isOpen ? '-' : '+' }}</span>
        {{ model.name }}
      </div>
      <ul v-show="isOpen">
        <m-tree v-for="model in model.children" :key="model.id" :model="model"></m-tree>
      </ul>
    </li>
  `,
  props: {
    model: {}
  },
  data: function () {
    return {
      isOpen: false
    }
  },
  methods: {
    toggle: function (id, event) {
      const target = event.target
      if (target.getAttribute('m-loaded') === 'false') {
        axios.get('http://localhost:3000/children/' + id).then(resp => {
          for (let item of resp.data.children) {
            this.model.children.push({
              id: item.id,
              name: item.name,
              children: []
            })
          }
        }).catch(error => {
        }).then(() => {
          target.setAttribute('m-loaded', 'true')
        })
      }
      this.isOpen = !this.isOpen
    }
  }
})

const app = new Vue({
  el: '#app',
  data: {
    treeData: {
      name: 'Root',
      id: 0,
      children: []
    }
  }
})
