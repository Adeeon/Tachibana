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
        
       
        newpage: false,
        newpost: false,
        newcomment: false,
        edit: false,
        editcom: false,

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
        newimage: '',
        
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
        editcomment: function(comment) {
            axios({
                method: 'put',
                url: 'api/v1/comments/' + comment.id + '/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                }, 
                data: {
                    'body': comment.body,
                    'author': comment.author,
                    'post': this.loadedpost.id
                }
            })
            return this.loadpost(this.loadedpost)
        },
        editpost: function() {
            let filename = this.newimage
            axios({
                method: 'put',
                url: 'api/v1/posts/' + this.loadedpost.id + '/',
                headers: {
                    'X-CSRFToken': this.csrfToken
                }, 
                data: {
                    'title':this.loadedpost.title,
                    'author': this.loadedpost.author,
                    'body':this.loadedpost.body,
                    'page':this.loadedpost.page_detail.id,
                    'image_head': filename
                }
            })
            return this.loadpost(this.loadedpost)
        },
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
            })
            return this.loadhome()
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
                },
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
            }).then(this.loadpost(this.loadedpost))
        },
        loadhome: function() {
            this.previous = {}
            this.newimage = ''
            this.loadedpage = {}
            this.loadedpost = {}
            this.newpage = false
            this.newpost = false
            this.newcomment = false
            this.edit = false
            this.editcom = false
            axios({
                method: 'get',
                url:'api/v1/TachiHome'
            }).then(response => {this.home = response.data})
            .catch(error => {this.errornotes = error.resposne.data})
        },
        loadpage: function(page) {
            this.home = {}
            this.loadedpost = {}
            this.newimage = ''
            this.newpage = false
            this.newpost = false
            this.newcomment = false
            this.edit = false
            this.editcom = false
            axios({
                method:'get', 
                url:'api/v1/pages/' + page.id
            }).then(response => this.loadedpage = response.data)
        },
        loadpost: function(post) {
            this.home = {}
            this.loadedpage = {}
            this.newimage = ''
            this.newpage = false
            this.newpost = false
            this.newcomment = false
            this.edit = false
            this.editcom = false
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
            if ((this.loadhome).length) {
                return this.loadhome()
            }
            else if ((this.loadedpage).length) {
                this.loadpage(this.loadedpage)
            }
            
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
            })
            if (this.loadhome.length) {
                return this.loadhome()
            }
            else if (this.loadedpage.length) {
                this.loadpage(this.loadedpage)
            }            
        },
    },
    created: function (){
        this.loadhome()
    },
    mounted: function() {
        this.csrfToken = document.querySelector("input[name=csrfmiddlewaretoken]").value
    }
})