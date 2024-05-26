// export const mergeAudioVideoFiles = (videoFile: File, audioFile: File): Promise<Blob> => {
//     return new Promise((resolve, reject) => {
//         const videoElement = document.createElement('video');
//         const audioElement = document.createElement('audio');

//         const videoUrl = URL.createObjectURL(videoFile);
//         const audioUrl = URL.createObjectURL(audioFile);

//         videoElement.src = videoUrl;
//         audioElement.src = audioUrl;

//         const canvas = document.createElement('canvas');
//         const ctx = canvas.getContext('2d');

//         if (!ctx) {
//             reject(new Error('Failed to get 2D context'));
//             return;
//         }

//         videoElement.onloadedmetadata = () => {
//             canvas.width = videoElement.videoWidth;
//             canvas.height = videoElement.videoHeight;

//             const videoStream = (canvas as any).captureStream();
//             const audioStream = (audioElement as any).captureStream();

//             const combinedStream = new MediaStream([
//                 ...videoStream.getVideoTracks(),
//                 ...audioStream.getAudioTracks(),
//             ]);

//             const mediaRecorder = new MediaRecorder(combinedStream);
//             const chunks: BlobPart[] = [];

//             mediaRecorder.ondataavailable = (event) => {
//                 if (event.data.size > 0) {
//                     chunks.push(event.data);
//                 }
//             };

//             mediaRecorder.onstop = () => {
//                 const blob = new Blob(chunks, { type: 'video/webm' });
//                 resolve(blob);
//             };

//             mediaRecorder.onerror = (event) => {
//                 const errorEvent = event as ErrorEvent;
//                 reject(new Error(errorEvent.message));
//             };

//             mediaRecorder.start();

//             const drawFrame = () => {
//                 if (videoElement.paused || videoElement.ended) {
//                     mediaRecorder.stop();
//                     return;
//                 }
//                 ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
//                 requestAnimationFrame(drawFrame);
//             };

//             videoElement.play().catch((error) => reject(new Error('Error playing video: ' + error.message)));
//             audioElement.play().catch((error) => reject(new Error('Error playing audio: ' + error.message)));
//             drawFrame();
//         };

//         videoElement.onerror = () => {
//             reject(new Error('Error loading video'));
//         };

//         audioElement.onerror = () => {
//             reject(new Error('Error loading audio'));
//         };
//     });
// };


export const mergeAudioVideoFiles = (videoFile: File, audioFile: File): Promise<Blob> => {
    return new Promise((resolve, reject) => {
        const videoElement = document.createElement('video');
        const audioElement = document.createElement('audio');

        const videoUrl = URL.createObjectURL(videoFile);
        const audioUrl = URL.createObjectURL(audioFile);

        videoElement.src = videoUrl;
        audioElement.src = audioUrl;

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            reject(new Error('Failed to get 2D context'));
            return;
        }

        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaElementSource(audioElement);
        const destination = audioContext.createMediaStreamDestination();

        audioSource.connect(destination);

        videoElement.onloadedmetadata = () => {
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            const videoStream = canvas.captureStream();
            const audioStream = destination.stream;

            const combinedStream = new MediaStream([
                ...videoStream.getVideoTracks(),
                ...audioStream.getAudioTracks(),
            ]);

            const mediaRecorder = new MediaRecorder(combinedStream);
            const chunks: BlobPart[] = [];

            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunks, { type: 'video/webm' });
                resolve(blob);
            };

            mediaRecorder.onerror = (event: Event) => {
                reject(new Error(`MediaRecorder error: ${(event as any).error.message}`));
            };

            mediaRecorder.start();

            const drawFrame = () => {
                if (videoElement.paused || videoElement.ended) {
                    mediaRecorder.stop();
                    return;
                }
                ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                requestAnimationFrame(drawFrame);
            };

            videoElement.play().catch((error) => reject(new Error(`Error playing video: ${error.message}`)));
            audioElement.play().catch((error) => reject(new Error(`Error playing audio: ${error.message}`)));
            drawFrame();
        };

        videoElement.onerror = () => {
            reject(new Error('Error loading video'));
        };

        audioElement.onerror = () => {
            reject(new Error('Error loading audio'));
        };
    });
};


