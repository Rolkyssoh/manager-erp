import { useAuthStore } from '../../stores';
import React from 'react';
import {
  Callout,
  Link,
  mergeStyleSets,
  Text,
  FontWeights,
  ActionButton,
} from '@fluentui/react';
import { useBoolean, useId } from '@fluentui/react-hooks';
import { DefaultButton } from '@fluentui/react/lib/Button';

export interface IDropDwonProps {
  default_props?: boolean;
}

export const CustomDropdownComponent: React.FC<IDropDwonProps> = () => {
  const [isCalloutVisible, { toggle: toggleIsCalloutVisible }] =
    useBoolean(false);
  const buttonId = useId('callout-button');
  const labelId = useId('callout-label');
  const descriptionId = useId('callout-description');

  const { updateToken } = useAuthStore();

  const doLogout = () => {
    localStorage.clear();
    updateToken('');
  };

  return (
    <>
      <DefaultButton
        id={buttonId}
        onClick={toggleIsCalloutVisible}
        text={isCalloutVisible ? 'Hide callout' : 'Show callout'}
        className={styles.button}
      />
      {isCalloutVisible && (
        <Callout
          className={styles.callout}
          ariaLabelledBy={labelId}
          ariaDescribedBy={descriptionId}
          gapSpace={0}
          target={`#${buttonId}`}
          onDismiss={toggleIsCalloutVisible}
          setInitialFocus
        >
          <Text block variant="xLarge" className="dropdown-header" id={labelId}>
            Callout title here
          </Text>
          <hr className="someClass" />
          <div className="dropdowninfos">
            <div className="dropdowninfos_details">
              <Text>First name</Text>
              <Text>Last name</Text>
              <Text>Email</Text>
            </div>
            <ActionButton className="editbuttonstyle" text="Edit" />
          </div>
          <hr />
          <div className="dropdown-pwd">
            <div>
              <Text>Password</Text>
            </div>
            <ActionButton className="editbuttonstyle" text="Edit" />
          </div>
          <hr />
          <div className="dropdown-footer">
            <ActionButton
              className="editbuttonstyle"
              text="Logout"
              onClick={doLogout}
            />
          </div>
        </Callout>
      )}
    </>
  );
};

const styles = mergeStyleSets({
  button: {
    width: 130,
  },
  callout: {
    width: 320,
    maxWidth: '90%',
  },
  title: {
    marginBottom: 12,
    fontWeight: FontWeights.semilight,
  },
  link: {
    display: 'block',
    marginTop: 20,
  },
});
