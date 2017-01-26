package com.spydroid;

import com.facebook.react.ReactActivity;
import com.gcrabtree.rctsocketio.SocketIoPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainActivity extends ReactActivity {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "spydroid";
    }

    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
        new MainReactPackage(),
        // new VectorIconsPackage(),
        // new OrientationPackage(this),
        new SocketIoPackage()
      );
    }
}
