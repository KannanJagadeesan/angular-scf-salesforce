/**
 * @DESC: Routing related configs goes here
 * 
 */

var STATECONFIG = {

   /**
    *   Assement routing config.
    *   There are no child routes  
    */ 

            "assess" : {    url: "/assess",
                            template : '<scf-assess></scf-assess>'
                       },


    /** 
     *  Prioritize routing config.
     * There are child routes avaiable
     */                    

        "prioritize" : {
                            url: '/prioritize',
                            template : '<scf-prioritize></scf-prioritize>'
                       }
}