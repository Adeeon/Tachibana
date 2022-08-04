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
        previous: {},
        static: [],
        profile: {},

        loadedpage: {},
        loadedpost: {},

        newhome: {},
        newpage: {},
        newpost: {},
        newcomment: {},

        rhome: {},
        errornotes: {},
    },
    methods: {
        loadhome: function() {
            this.previous = {}
            this.loadedpage = {}
            this.loadedpost = {}
            axios({
                method: 'get',
                url:'api/v1/TachiHome'
            }).then(response => {this.home = response.data})
            .catch(error => {this.errornotes = error.resposne.data})
        },
        loadpage: function(page) {
            this.home = {}
            axios({
                method:'get', 
                url:'api/v1/pages/' + page.id
            }).then(response => this.loadedpage = response.data)
        },
        loadpost: function(post) {
            this.home = {}
            this.loadedpage = {}
            axios({
                method:'get',
                url: 'api/v1/posts/' + post.id
            }).then(response => this.loadedpost = response.data)
        },
        loadprofile: function(profile) {
            axios({
                method: 'get',
                url: 'api/v1/users/' + profile.id
            }).then(response => this.profile = response.data)
        },
        comrateup: function(com) {
            axios({
                method:'patch', 
                url: 'api/v1/comments/' + com.id + '/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    rate: com.rate + 1
                }
            }).then(response => this.static = response.data)
            .then(loadpost(post))
            
        },
        comratedown: function(com) {
            axios({
                method:'patch', 
                url: 'api/v1/comments/' + com.id + '/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    rate: com.rate - 1
                }
            }).then(response => this.static = response.data)
            .then(loadpost(post))
            
        },
        postratedown: function(post) {
            axios({
                method:'patch', 
                url: 'api/v1/posts/' + post.id + '/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    rate: post.rate - 1
                }
            }).then(response => this.static = response.data)
            .then(loadpost(post))
            
        },
        postrateup: function(post) {
            axios({
                method:'patch', 
                url: 'api/v1/posts/' + post.id + '/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    rate: post.rate + 1
                }
            }).then(response => this.static = response.data)            
        },
    },
    created: function (){
        axios({
            method: 'get',
            url:'api/v1/TachiHome'
        }).then(response => this.home = response.data)
    },
    mounted: function() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})