<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTowingRequestRequest;
use App\Http\Resources\TowingRequestResource;
use App\Models\TowingRequest;

class TowingRequestController extends Controller
{
    public function index()
    {
        $requests = TowingRequest::query()
            ->latest()
            ->paginate(15);

        return TowingRequestResource::collection($requests);
    }

    public function store(StoreTowingRequestRequest $request)
    {
        $towingRequest = TowingRequest::create($request->validated());

        return (new TowingRequestResource($towingRequest))
            ->response()
            ->setStatusCode(201);
    }

    public function assign(TowingRequest $towingRequest)
    {
        $towingRequest->update(['status' => 'assigned']);

        return new TowingRequestResource($towingRequest);
    }

    public function destroy(TowingRequest $towingRequest)
    {
        $towingRequest->delete();

        return response()->noContent();
    }
}
