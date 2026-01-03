import { useSharedValue, useDerivedValue, runOnJS } from 'react-native-reanimated';
import { Gesture } from 'react-native-gesture-handler';
import { useWindowDimensions } from 'react-native';
import { useCallback } from 'react';

const GRID_SIZE = 25; // Snap grid size? Or just visual grid.
const INTERACTION_THRESHOLD = 40;

interface UseVectorGestureParams {
    canvasSize: { width: number, height: number };
    onVectorChange?: (vecA: {x: number, y: number}, vecB: {x: number, y: number}) => void;
}

export const useVectorGesture = ({ canvasSize, onVectorChange }: UseVectorGestureParams) => {
    // Vectors in Cartesian coordinates (0,0 is center)
    const vecA = useSharedValue({ x: 50, y: 100 });
    const vecB = useSharedValue({ x: 150, y: -50 });

    // Resultant is derived
    const resultant = useDerivedValue(() => {
        return {
            x: vecA.value.x + vecB.value.x,
            y: vecA.value.y + vecB.value.y
        };
    });

    const dragging = useSharedValue<null | 'A' | 'B'>(null);

    // Callback to notify React state when vectors change
    const notifyChange = useCallback(() => {
        if (onVectorChange) {
            onVectorChange(
                { x: vecA.value.x, y: vecA.value.y },
                { x: vecB.value.x, y: vecB.value.y }
            );
        }
    }, [onVectorChange]);

    // Helpers to convert Canvas <-> Cartesian
    // But Gesture gives Canvas coordinates (0,0 at top-left)
    // Guard against undefined or 0 dimensions
    const centerX = canvasSize?.width ? canvasSize.width / 2 : 0;
    const centerY = canvasSize?.height ? canvasSize.height / 2 : 0;

    const gesture = Gesture.Pan()
        .onBegin((e) => {
            // Convert touch to Cartesian to compare
            const touchCartX = e.x - centerX;
            const touchCartY = -(e.y - centerY); // Flip Y

            // Check distance to A
            const distA = Math.sqrt(
                Math.pow(touchCartX - vecA.value.x, 2) +
                Math.pow(touchCartY - vecA.value.y, 2)
            );

            // Check distance to B
            const distB = Math.sqrt(
                Math.pow(touchCartX - vecB.value.x, 2) +
                Math.pow(touchCartY - vecB.value.y, 2)
            );

            if (distA < INTERACTION_THRESHOLD && distA <= distB) {
                dragging.value = 'A';
            } else if (distB < INTERACTION_THRESHOLD) {
                dragging.value = 'B';
            } else {
                dragging.value = null;
            }
        })
        .onUpdate((e) => {
            const touchCartX = e.x - centerX;
            const touchCartY = -(e.y - centerY);

            // Snap to integer for cleaner values?
            const newX = Math.round(touchCartX);
            const newY = Math.round(touchCartY);

            if (dragging.value === 'A') {
                vecA.value = { x: newX, y: newY };
                runOnJS(notifyChange)();
            } else if (dragging.value === 'B') {
                vecB.value = { x: newX, y: newY };
                runOnJS(notifyChange)();
            }
        })
        .onFinalize(() => {
            dragging.value = null;
        });

    // Functions to manually set vectors (for input fields)
    const setVecA = useCallback((x: number, y: number) => {
        vecA.value = { x, y };
        notifyChange();
    }, [notifyChange]);

    const setVecB = useCallback((x: number, y: number) => {
        vecB.value = { x, y };
        notifyChange();
    }, [notifyChange]);

    return {
        vecA,
        vecB,
        resultant,
        gesture,
        centerX,
        centerY,
        setVecA,
        setVecB,
    };
};
