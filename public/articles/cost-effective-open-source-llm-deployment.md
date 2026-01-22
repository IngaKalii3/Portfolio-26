# Cost-Effective Open-Source LLM Deployment

## The Economics Problem

Commercial LLM APIs are convenient but expensive at scale. For organizations processing millions of requests monthly, inference costs can exceed six figures annually. Open-source models offer a path to 10-100x cost reduction—but only if deployed correctly.

This article shares lessons learned from deploying Llama and Mistral variants in production environments.

## Model Selection Framework

### Capability vs. Cost Matrix
Not every task needs GPT-4-class performance. Map your use cases:

| Use Case | Required Capability | Recommended Model Class |
|----------|--------------------|-----------------------|
| Simple classification | Low | Llama 3 8B, Mistral 7B |
| Summarization | Medium | Llama 3 70B, Mixtral 8x7B |
| Complex reasoning | High | Llama 3.1 405B, Commercial API |

### Quantization Trade-offs
Quantization reduces memory footprint and increases throughput:
- **FP16**: Baseline quality, 2x memory vs FP32
- **INT8**: ~1% quality loss, 2x memory reduction
- **INT4 (GPTQ/AWQ)**: 2-5% quality loss, 4x memory reduction

For most production workloads, INT8 hits the sweet spot.

## Infrastructure Architecture

### Hardware Recommendations

**For 7B-13B models:**
- Single A10G or L4 GPU
- 24GB VRAM sufficient for INT8
- ~$0.50-1.00/hour on cloud

**For 70B models:**
- 4x A10G or 2x A100-40GB
- Tensor parallelism required
- ~$4-8/hour on cloud

**For 405B models:**
- 8x H100 minimum
- Complex orchestration needed
- Consider commercial APIs for rare use cases

### Serving Stack

We've tested multiple serving frameworks:

1. **vLLM**: Best overall throughput, excellent batching
2. **TensorRT-LLM**: Fastest single-request latency, more setup complexity
3. **llama.cpp**: CPU inference, good for edge/hybrid deployments

### Autoscaling Strategy

Inference workloads are bursty. Effective autoscaling requires:
- Metrics: Queue depth + request latency (not just CPU/GPU utilization)
- Cool-down periods: GPU initialization takes 30-60 seconds
- Spot instances: 60-70% cost savings with proper fallback handling

## Production Lessons

### Lesson 1: Batching Is Everything
Single-request inference wastes GPU compute. Implement:
- Request queuing with dynamic batch formation
- Maximum batch size tuned to VRAM
- Maximum wait time to balance latency/throughput

A well-tuned batching system can 5x your effective throughput.

### Lesson 2: Prompt Caching Matters
Many applications share prompt prefixes (system prompts, few-shot examples). KV-cache reuse eliminates redundant computation:
- vLLM prefix caching: 2-3x speedup for cached prefixes
- Semantic caching: Hash-based lookup for identical/similar prompts

### Lesson 3: Don't Ignore Tokenization
Tokenizer quirks cause production bugs:
- Special token handling differs between models
- Chat templates must match training format exactly
- Token counting for rate limiting needs the right tokenizer

### Lesson 4: Monitor Everything
Key metrics to track:
- Time to first token (TTFT)
- Tokens per second (TPS)
- Queue depth and wait time
- Error rates by error type
- Cost per 1K tokens (your North Star)

## Cost Comparison: Real Numbers

For a workload of 10M tokens/month input, 5M tokens/month output:

| Provider | Monthly Cost |
|----------|-------------|
| GPT-4 Turbo | ~$400 |
| Claude 3 Sonnet | ~$180 |
| Self-hosted Llama 3 70B | ~$50-80 |
| Self-hosted Llama 3 8B | ~$15-25 |

Self-hosting adds operational complexity, but the math works for sustained workloads.

## When NOT to Self-Host

Self-hosting makes sense when:
- Sustained high volume (>1M tokens/day)
- Predictable workload patterns
- Engineering resources available

Stick with APIs when:
- Bursty, unpredictable workloads
- Rapid model iteration needed
- Compliance requires specific certifications

## Conclusion

Open-source LLM deployment is no longer bleeding-edge. With the right infrastructure choices and operational practices, organizations can achieve dramatic cost reductions while maintaining quality.

The key is matching model capability to task requirements, investing in proper serving infrastructure, and treating inference as a first-class production system—not an afterthought.
