import { Transform, TransformFnParams } from 'class-transformer'
import { IsAlpha, IsInt, IsLowercase, IsOptional } from 'class-validator'
import { isArray } from 'lodash'

/**
 * Transform non-array value to array with one element.
 */
function TransformArray({ value: array }: TransformFnParams) {
    return !isArray(array) ? [array] : array
}

function ParseInt({ value: array }: TransformFnParams) {
    return array.map((val) => Number(val))
}

export class GetFilmsDto {
    @IsOptional()
    @Transform(TransformArray)
    @Transform(ParseInt)
    @IsInt({ each: true })
    creationYears?: number[]

    @IsOptional()
    @Transform(TransformArray)
    @Transform(ParseInt)
    @IsInt({ each: true })
    ageLimits?: number[]

    @IsOptional()
    @Transform(TransformArray)
    @IsAlpha('en-US', { each: true })
    @IsLowercase({ each: true })
    categories?: string[]

    @IsOptional()
    @Transform(TransformArray)
    @IsAlpha('en-US', { each: true })
    @IsLowercase({ each: true })
    countries?: string[]

    @IsOptional()
    @Transform(TransformArray)
    @IsAlpha('en-US', { each: true })
    @IsLowercase({ each: true })
    genres?: string[]
}
