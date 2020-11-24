<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class Record extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array
     */
    public function toArray($request)
    {
        return [
            'id'         => $this->id,
            'type'       => $this->type,
            'category'   => $this->category,
            'date'       => $this->date,
            'sum'        => $this->sum,
            'description'=> $this->description,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}
