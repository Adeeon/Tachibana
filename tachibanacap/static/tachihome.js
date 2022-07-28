// Vue.component('comments', {
//     data:function() {
//         return {
//             comments: []
//         }
//     },
//     props: ['comms'],
//     delimiters: ['[[',']]'],
//     template: `
//             <p>
//                 <template v-if='comments = ![]'
//                     <p>Vote</p>
//                 </template>

//                 <template v-else>
//                     <p>
//         `
// })


const vm = new Vue ({
    el:'#tachihome',
    delimiters: ['[[',']]'],
    data: {
        csrfToken: '',
        searchbar: '',

        fpage: {},
        home: {},
        page: {},
        post: {},
        comment: {},

        loadedpage: {},
        loadedpost: {},

        newhome: {},
        newpage: {},
        newpost: {},
        newcomment: {},

        rhome: {},
        error: {},
    },
    methods: {
        loadhome: function() {
            axios({
                method: 'get',
                url:'api/v1/pages'
            }).then(response => this.home = response.data)
        },
        loadpage: function() {
            axios({
                method:'get', 
                url:'api/v1/' + this.page
            }).then(response => this.loadedpage = response.data)
        },
        loadpost: function() {
            axios({
                method:'get',
                url: 'api/v1/' + this.post
            }).then(response => this.loadedpost = response.data)
        }
    },
    created: function (){
        axios({
            method: 'get',
            url:'api/v1/pages'
        }).then(response => this.home = response.data)
    },
    mounted: function() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})