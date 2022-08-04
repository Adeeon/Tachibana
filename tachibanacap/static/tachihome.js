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
        
        options: false,
        newpage: false,
        newpost: false,
        newcomment: false,

        newpageput: {
            'name':'',
            'home': 1,
            'purpose':'',
            'top_image':null
        },
        newpostput: {
            'title':'',
            'author':'',
            'body':'',
            'page':'',
            'image_head':null
        },
        newpostcomment: {
            'body':'',
            'author':0,
            'post':0

        },

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

        rhome: {},
        errornotes: {},
    },
    methods: {
        newpagepost: function() {
            axios({
                method: 'post',
                url: 'api/v1/pages/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    'name':this.newpageput.name,
                    'home':this.newpageput.home,
                    'purpose':this.newpageput.purpose,
                    'top_image':this.newpageput.top_image
                }
            }).then(response => {this.loadhome()})
        },
        newpostpost: function() {
            axios({
                method: 'post',
                url: 'api/v1/posts/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    'author':this.newpostput.author,
                    'title':this.newpostput.title,
                    'image_head':this.newpostput.image_head,
                    'body':this.newpostput.body,
                    'page':this.newpostput.page
                }
            })
        },
        newcommentpost: function() {
            axios({
                method: 'post',
                url: 'api/v1/comments/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                },
                data: {
                    'body':this.newpostcomment.body,
                    'author':this.newpostcomment.author,
                    'post':this.newpostcomment.post,
                }
            }).then(response => {this.loadhome()})
        },
        loadhome: function() {
            this.previous = {}
            this.loadedpage = {}
            this.loadedpost = {}
            this.newpage = false
            this.newpost = false
            this.options = false
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
        this.loadhome()
    },
    mounted: function() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})