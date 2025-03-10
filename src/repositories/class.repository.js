class ClassRepository {
    constructor(dao) {
        this.dao = dao;
    }

    async getItem(filter) { 
        return await this.dao.getBy(filter);
    }

    async getItems(page, limit) { 
        return await this.dao.getAll(page, limit);
    }

    async createItem(newItem) { 
        return await this.dao.create(newItem);
    }

    async updateItem(id, itemUpdate) { 
        return await this.dao.update(id, itemUpdate);
    }

    async deleteItem(id) { 
        return await this.dao.delete(id);
    }
}

module.exports = ClassRepository;
