<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSudokuScoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:50'],
            'difficulty' => ['required', 'in:easy,medium,hard'],
            'time_seconds' => ['required', 'integer', 'min:10', 'max:86400'],
        ];
    }

    public function messages(): array
    {
        return [
            'time_seconds.min' => "Nice try McQueen ⚡ under :min seconds is impressive… for *typing 9 random numbers*. Try again with a real time, champ.",
        ];
    }

    public function attributes(): array
    {
        return [
            'time_seconds' => 'time',
        ];
    }
}
