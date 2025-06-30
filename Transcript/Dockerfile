FROM python:3.10-slim
RUN pip install flask youtube-transcript-api
COPY transcript_server.py .
EXPOSE 8000
CMD ["python", "transcript_server.py"]