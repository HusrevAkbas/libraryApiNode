import { AppDataSource } from "../data-source";
import { Library } from "../entity/Library";

export class LibraryController {

    private libraryRepository = AppDataSource.getRepository(Library)

    async all() {
        return this.libraryRepository.find();
    }

    async one(id: number) {
        const library = await this.libraryRepository.findOne({
            where: { id },
            relations: { user: true }
        })
        return library ? library : new Library()
    }

    async add(library: Library) {
        return await this.libraryRepository.save(library)

    }

    async update(id: number, library: Library) {
        await this.libraryRepository.update(id, library)
        return await this.libraryRepository.findOne({
            where: { id }
        })
    }

    async remove(library: Library) {
        return this.libraryRepository.remove(library)
    }

}