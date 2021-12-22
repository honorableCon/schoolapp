const { createClient } = require('@supabase/supabase-js')

class Database {
    constructor(url, apiKey, table) {
        this.url = url;
        this.apiKey = apiKey;
        this.table = table
        this.supabase = createClient(url, apiKey);
    }
    async get() {
        const { data, error } = await this.supabase
            .from(this.table)
            .select()
        
        return data
    }
    async add(documents){
        const { data, error } = await this.supabase
        .from(this.table)
        .insert(documents)

        return data
    }
    async modify(id, newObjet){
        const { data, error } = await this.supabase
        .from(this.table)
        .update(newObjet)
        .match({ id })

        return data
    }
    async delete(id){
        const { data, error } = await this.supabase
            .from(this.table)
            .delete()
            .match({ id })
            
        return data;
    }
}

module.exports = Database
