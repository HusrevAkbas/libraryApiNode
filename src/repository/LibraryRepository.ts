import { AppDataSource } from "../data-source";
import { Library } from "../entity/Library";

export class LibraryRepository {

    private libraryRepository = AppDataSource.getRepository(Library)

    all() {
        return this.libraryRepository.find();
    }

    one(id: number) {
        return this.libraryRepository.findOne({
            where: { id }
        })
    }

    findByUserId(id: number){
        return this.libraryRepository.find({
            where: {user:{id}}
        })
    }

    save(library: Library) {
        return this.libraryRepository.save(library)
    }

    update(id: number, library: Library) {
        return this.libraryRepository.update(id, library)
    }

    remove(library: Library) {
        return this.libraryRepository.remove(library)
    }

    merge(library :Library, library2 :Library){
        return this.libraryRepository.merge(library,library2)
    }

    preload(library:Library){
        return this.libraryRepository.preload(library)
    }



}