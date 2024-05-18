import { PartialType } from '@nestjs/mapped-types'
import { CreateFilmDto } from './create-film.dto'

export class UpdateFilmDto extends PartialType(CreateFilmDto) {
    /**
     * @returns a copy of this dto without not Film entity properties
     */
    getExcludedCopy() {
        const thisCopy = JSON.parse(JSON.stringify(this)) as UpdateFilmDto

        delete thisCopy.personIds
        delete thisCopy.countryIds
        delete thisCopy.genreIds

        return thisCopy
    }
}
