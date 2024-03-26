import { linearProgressLabelProps } from '@/interface/linearProgressLabel.interface'
import { LinearProgressWithLabelWrapper } from '@/styles/StyledComponents/LinearProgressWithLabelWrapper'
import ProgressBar from '@ramonak/react-progress-bar'

export default function LinearProgressBarWithLabel({ completed, ...others }: linearProgressLabelProps) {
    return (
        <LinearProgressWithLabelWrapper>
            <ProgressBar
                completed={completed}
                height="8px"
                className="progress_bar"
                baseBgColor="#efefef"
                barContainerClassName="container"
                // completedClassName="barCompleted"
                labelClassName="label"
                {...others}

            />
        </LinearProgressWithLabelWrapper>
    )
}
