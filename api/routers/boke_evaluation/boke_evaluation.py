from fastapi import APIRouter, HTTPException
from schemas import BokeEvaluationRequest, BokeEvaluationResponse
from usecases.boke_evaluation import evaluate_boke

router = APIRouter(prefix="/boke_evaluation")

@router.post("/", response_model=BokeEvaluationResponse)
async def index(request: BokeEvaluationRequest):
    """渡された複数のボケを順位付けして返却する

    渡された複数のボケに対して OpenAI を利用して順位付けを行う

    Args:
        request (BokeEvaluationRequest): 最大4個までボケを受け取る

    Returns:
        BokeEvaluationResponse: 順位付けしたボケを返却する
    """
    ranks = evaluate_boke(request.bokes)

    if len(ranks) != len(request.bokes):
        raise HTTPException(status_code=500, detail="The number of blurbs received and the number of rankings processed are different.")

    return BokeEvaluationResponse(ranks=ranks)
