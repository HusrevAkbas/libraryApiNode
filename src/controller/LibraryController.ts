import { AppDataSource } from "../data-source";
import { Library } from "../entity/Library";

export class LibraryController {

    private libraryRepository = AppDataSource.getRepository(Library)

    all() {
        return this.libraryRepository.find();
    }

    one(id: number) {
        return this.libraryRepository.findOne({
            where: { id },
            relations: { user: true }
        })
    }

    add(library: Library) {
        return this.libraryRepository.save(library)

    }

    update(id: number, library: Library) {
        return this.libraryRepository.update(id, library)
    }

    remove(library: Library) {
        return this.libraryRepository.remove(library)
    }

}